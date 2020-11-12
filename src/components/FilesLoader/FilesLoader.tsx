/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 13:39
 * All rights reserved.
 */

import React from "react";
import {Box, Input, InputBase, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import {useDropzone} from 'react-dropzone'
import Stylable from "../../interfaces/Stylable";
import clsx from "clsx";
import request from "superagent";
import TempFile from "../../entities/TempFile";
import {coreRequest} from "../../utils/Rest";
import useCoreRequest from "../../hooks/useCoreRequest";

export const displayName = "FilesLoader";

export interface FilesLoaderProps extends Stylable {
    onBeforeLoad?(files: File[]): File[],
    onLoaded?(files: TempFile): void;
    onError?(error: any): void;
    onProgress?(event: ProgressEvent): void;
    multiple?: boolean;

}

const FilesLoader = React.forwardRef((props: FilesLoaderProps, ref) => {
    const {
        classes,
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
                        const entity = new TempFile(result.body);
                        setTempFiles(prev => ({...prev, entity}))
                        onLoaded && onLoaded(entity);
                    } catch(error) {
                        //TODO: handle
                    }
                })
                .catch(error => {
                    onError && onError(error);
                });
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    console.log(tempFiles);

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


    return (
        <Box
            className={clsx(classes.container, isDragActive && classes.containerDrag)}
            {...getRootProps()}
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
            {/*{isDragActive ?*/}
            {/*    <p>Drop the files here ...</p> :*/}
            {/*    <p>Drag 'n' drop some files here, or click to select files</p>*/}
            {/*}*/}
        </Box>
    );
});

FilesLoader.displayName = displayName;

export default withStyles(styles)(FilesLoader);