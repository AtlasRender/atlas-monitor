/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 13:39
 * All rights reserved.
 */

import React from "react";
import {
    Avatar,
    Box, IconButton,
    InputBase,
    ListItem,
    ListItemAvatar, ListItemSecondaryAction,
    ListItemText,
    Typography,
    withStyles,
    List, LinearProgress,
} from "@material-ui/core";
import styles from "./styles";
import {useDropzone} from 'react-dropzone'
import Stylable from "../../interfaces/Stylable";
import clsx from "clsx";
import request from "superagent";
import TempFile from "../../entities/TempFile";
import useCoreRequest from "../../hooks/useCoreRequest";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import {element} from "prop-types";


export const displayName = "FilesLoader";

/**
 * FilesLoaderProps - props for FilesLoader component.
 * @author Danil Andreev
 */
export interface FilesLoaderProps extends Stylable {
    onBeforeLoad?(files: File[]): File[],

    onLoaded?(files: TempFile): void;

    onError?(error: any): void;

    onProgress?(event: ProgressEvent): void;

    multiple?: boolean;

    getFileId(id: number): void;

}

/**
 * UploadedFile - interface for local files accounting.
 * @interface
 */
interface UploadedFile {
    file: File;
    temp?: TempFile;
    progress: number;
    id: number;
}

/**
 * getNextFileId - generator for generating ids for upload files.
 * @function
 * @generator
 * @author Danil Andreev
 */
function* getNextFileId() {
    let id = 0;
    while (true) {
        id++;
        yield id;
    }
    return id;
}

/**
 * FilesLoader - React component for selecting one or several files and upload them to temp storage.
 * @function
 * @author Danil Andreev
 */
const FilesLoader = React.forwardRef((props: FilesLoaderProps, ref) => {
    const {
        classes,
        className,
        style,
        onBeforeLoad,
        onLoaded,
        onError,
        onProgress,
        multiple,
        getFileId,
        ...other

    } = props;
    const coreRequest = useCoreRequest();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const IdGenerator = React.useRef(getNextFileId());

    const [tempFiles, setTempFiles] = React.useState<UploadedFile[]>([]);

    /**
     * onDrop - event handler for files upload.
     * @function
     * @callback
     * @author Danil Andreev
     */
    const onDrop = React.useCallback((inputFiles: File[]) => {
        if (!multiple) clearTempFiles();
        let files = inputFiles;
        if (onBeforeLoad) files = onBeforeLoad(files);
        for (const file of files) {
            const newFile: UploadedFile = {
                file,
                progress: 0,
                id: IdGenerator.current.next().value,
            };
            setTempFiles(prev => [...prev, newFile]);
            coreRequest()
                .post("file")
                .attach(file.name, file)
                .on("progress", (event: ProgressEvent): void => {
                    const progress = 100 * event.loaded / event.total;
                    setTempFiles(prev => {
                        const next = [...prev];
                        const targetId = next.findIndex((candidate: UploadedFile) => candidate.id === newFile.id);
                        if (targetId < 0) return next;
                        next[targetId].progress = progress;
                        return next;
                    });

                    onProgress && onProgress(event)
                })
                .then((result: request.Response): void => {
                    try {
                        const entity = new TempFile(result.body[0]); //TODO: change to body.
                        setTempFiles(prev => {
                            const next = [...prev];
                            const targetId = next.findIndex((candidate: UploadedFile) => candidate.id === newFile.id);
                            if (targetId < 0) return next;
                            next[targetId].temp = entity;
                            next[targetId].progress = 1000;
                            return next;
                        });
                        onLoaded && onLoaded(entity);
                    } catch (error) {
                        enqueueErrorSnackbar("Error deleting file.");
                    }
                })
                .catch(error => {
                    onError && onError(error);
                });
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    /**
     * clearTempFiles - removes currently selected files from core origin temp storage.
     * @function
     * @author Danil Andreev
     */
    function clearTempFiles() {
        const targets = [...tempFiles];
        for (const target of targets) {
            if (!target.temp) continue;
            deleteFile(target.temp.id).catch(error => {
                enqueueErrorSnackbar(`Error deleting ${target.file.name}`);
            }).finally(() => setTempFiles([]));
        }
    }

    /**
     * deleteFile - deletes file with selected id from core temp storage.
     * @param id Id of the file in core storage
     * @function
     * @throws Error
     * @author Danil Andreev
     */
    async function deleteFile(id: number): Promise<void> {
        try {
            await coreRequest().delete(`file/${id}`);
        } catch (error) {
            throw error;
        } finally {
            setTempFiles(prev => prev.filter(item => item.temp && item.temp.id !== id));
        }
    }

    async function deleteByLocalId(id: number): Promise<boolean> {
        const target: UploadedFile | undefined = tempFiles.find((candidate: UploadedFile) => candidate.id === id);
        if (!target) return false;
        if (target.temp)
            await deleteFile(target.temp.id)
        else
            setTempFiles(prev => prev.filter((candidate: UploadedFile) => candidate.id !== id))
        return true;
    }

    return (
        <Box>
            <Box
                {...getRootProps()}
                className={clsx(
                    classes.root,
                    classes.dropzone,
                    classes.color,
                    isDragActive && classes.dropzoneDrag,
                    isDragActive && classes.rootDrag,
                    className,
                )}
                style={style}
            >
                <Box className={classes.textContainer}>
                    <Typography variant="h5">UPLOAD</Typography>
                    <Typography variant="body1" color="textSecondary">
                        {isDragActive ? "Drop files here ..." : "Drag and drop or click to select files."}

                    </Typography>
                </Box>
                <InputBase
                    className={classes.input}
                    inputProps={{...getInputProps(), color: "primary", multiple: !!multiple}}
                />
            </Box>
            {!!tempFiles.length &&
            <List>
                {tempFiles.map((file: UploadedFile) =>
                    <ListItem key={`file-item-${file.file.name}-${file.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <InsertDriveFileIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={file.file.name}
                            secondary={
                                file.progress <= 100 ?
                                    <LinearProgress variant="determinate" value={file.progress}/> :
                                    file.file.type
                            }
                            secondaryTypographyProps={{component: "div"}}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={event => deleteByLocalId(file.id)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            }
        </Box>
    );
});

FilesLoader.displayName = displayName;

export default withStyles(styles)(FilesLoader);
