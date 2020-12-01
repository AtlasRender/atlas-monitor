/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 01.12.2020, 03:49
 * All rights reserved.
 */

import React, {ChangeEvent, Ref, useState} from "react";
import {
    Box,
    Button,
    Grid,
    InputBase,
    ListItem,
    ListItemText,
    Slider,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import Stylable from "../../../interfaces/Stylable";
import styles from "./styles";
import validate from "validate.js";
import {number} from "prop-types";
import {StringField} from "@atlasrender/render-plugin";

interface StringPluginFieldProps extends Stylable {
    field: StringField;
    value?: string | null,

    onChange?(value: string | null): void;
}

const StringPluginField = React.forwardRef((props: StringPluginFieldProps, ref: Ref<HTMLElement>) => {
    const {
        classes,
        className,
        style,
        field,
        onChange,
        value,
    } = props;

    const [string, setString] = useState<string>(value ? value : "");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setString(event.target.value);
    }

    return (
        <Box className={classes.container}>
            <TextField
                fullWidth
                value={string}
                onChange={handleChange}
                onBlur={() => {
                    onChange && onChange(string);
                }}
            />
        </Box>
    );
})

export default withStyles(styles)(StringPluginField);