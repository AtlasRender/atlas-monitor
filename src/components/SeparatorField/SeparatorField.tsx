/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 01.12.2020, 03:36
 * All rights reserved.
 */

import React from "react";
import {Box, Divider, Typography, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";

interface SeparatorFieldProps extends Stylable {
    label?: string;
}

const SeparatorField = React.forwardRef((props: SeparatorFieldProps, ref) => {
    const {
        classes,
        className,
        style,
        label
    } = props;


    return (
        <Box className={classes.container}>
            {label &&
            <Typography>
                {label}
            </Typography>
            }
            <Divider className={classes.separator}/>
        </Box>
    );
});

export default withStyles(styles)(SeparatorField);