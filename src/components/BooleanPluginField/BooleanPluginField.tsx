/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 01.12.2020, 03:46
 * All rights reserved.
 */

import React, {useState} from "react";
import {Box, Divider, Switch, Typography, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";
import {PluginSetting} from "@atlasrender/render-plugin";


interface BooleanPluginFieldProps extends Stylable {
    value: boolean;
    label?: string;

    onChange(): void;
}

const BooleanPluginField = React.forwardRef((props: BooleanPluginFieldProps, ref) => {
    const {
        classes,
        className,
        style,
        onChange,
        value,
        label,
    } = props;


    return (
        <Box className={classes.container}>
            {label ?
                <Typography className={classes.text}>
                    {label}
                    <Switch
                        checked={value}
                        onChange={onChange}
                        name="checkedA"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </Typography>
                :
                <Switch
                    checked={value}
                    onChange={onChange}
                    name="checkedA"
                    inputProps={{"aria-label": "secondary checkbox"}}
                />
            }
        </Box>
    );
});

export default withStyles(styles)(BooleanPluginField);