/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 07.10.2020, 18:24
 * All rights reserved.
 */

import React from 'react';
import Stylable from "../../interfaces/Stylable";
import {Box, Button, Grid, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

/**
 * FileFieldProps - interface for FileField component
 * @interface
 * @author Andrii Demchyshyn
 */
interface FileFieldProps extends Stylable{
}

/**
 * FileField - creates component for file upload
 * @function
 * @author Andrii Demchyshyn
 */
const FileField = React.forwardRef((props: FileFieldProps, ref: React.Ref<any>) => {
    const {
        classes,
        className
    } = props;

    return(
        <Box className={classes.root}>
            <input
                accept="image/*"
                className={classes.displayNone}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </Box>
    );
});

export default withStyles(styles)(FileField);