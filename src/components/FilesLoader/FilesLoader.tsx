/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-monitor
 * File last modified: 11/11/20, 3:22 PM
 * All rights reserved.
 */

import React from "react";
import {Box, InputBase, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import {useDropzone} from 'react-dropzone'
import Stylable from "../../interfaces/Stylable";
import clsx from "clsx";
import request from "superagent";
import TempFile from "../../entities/TempFile";
import useCoreRequest from "../../hooks/useCoreRequest";

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
        ...other
    } = props;
    const coreRequest = useCoreRequest();

    const [tempFiles, setTempFiles] = React.useState<TempFile[]>([]);

    const onDrop = React.useCallback((inputFiles: File[]) => {
        clearTempFiles().then();
        setTempFiles([]);
        let files = inputFiles;
        if (onBeforeLoad) files = onBeforeLoad(files);
        for (const file of files) {
            coreRequest()
                .post("file")
                .attach(file.name, file)
                //.set("Content-Type", "multipart/form-data;boundary=------WebKitFormBoundaryMz3X4OkgkDm4rYRB")
                .on("progress", (event: ProgressEvent): void => onProgress && onProgress(event))
                .then((result: request.Response): void => {
                    try {
                        const entity = new TempFile(result.body[0]); //TODO: change to body.
                        setTempFiles(prev => ([...prev, entity]));
                        onLoaded && onLoaded(entity);
                    } catch (error) {
                        //TODO: handle
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
    async function clearTempFiles() {
        const targets = [...tempFiles];
        for (const target of targets) {
            coreRequest()
                .delete(`/files/${target.id}`)
                .then()
                .catch(error => {
                    //TODO: handle error
                });
        }
    }

    const selectedFile: TempFile | undefined = tempFiles[0];
    const showSelectedFile: boolean = !multiple && !!selectedFile;

    return (
        <Box>
            {showSelectedFile &&
            <Box>
                {selectedFile.name}
            </Box>
            }
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
        </Box>
    );
});

FilesLoader.displayName = displayName;

export default withStyles(styles)(FilesLoader);
