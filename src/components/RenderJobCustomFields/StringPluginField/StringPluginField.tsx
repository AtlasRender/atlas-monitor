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
import {PluginSetting, StringField} from "@atlasrender/render-plugin";

interface StringPluginFieldProps extends Stylable {
    field: StringField;
    // value?: string | null,

    setPluginSetting(field: PluginSetting, value: number | string | null):void,
}

const StringPluginField = React.forwardRef((props: StringPluginFieldProps, ref: Ref<HTMLElement>) => {
    const {
        classes,
        className,
        style,
        field,
        setPluginSetting,
        // value,
    } = props;

    const [value, setValue] = useState<string>("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Button fullWidth>{field.name}</Button>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    fullWidth
                    value={value}
                    onChange={handleChange}
                    onBlur={() => {
                         setPluginSetting(field, value);
                    }}
                />
            </Grid>
        </Grid>
    );
})

export default withStyles(styles)(StringPluginField);