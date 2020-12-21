/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 01.12.2020, 03:46
 * All rights reserved.
 */

import React, {useEffect, useState} from "react";
import {Box, Grid, Switch, Typography, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";
import {BooleanField, IntegerField, PluginSetting} from "@atlasrender/render-plugin";


interface BooleanPluginFieldProps extends Stylable {
    field: BooleanField;
    valueD?: number,

    setPluginSetting(field: PluginSetting, value: number | string | boolean | null): void,
}

const BooleanPluginField = React.forwardRef((props: BooleanPluginFieldProps, ref) => {
    const {
        classes,
        className,
        style,
        field,
        setPluginSetting,
    } = props;

    const [value, setValue] = useState(field.default);


    useEffect(() => {
        setPluginSetting(field, value);
    }, [value]);


    function handleChange() {
        setValue(!value);
    }

    return (
        <Grid container spacing={1} className={classes.container}>

            {field.label ?
                <React.Fragment>
                    <Grid item xs={3} style={{display: "flex", justifyContent: "center", margin: 1}}>
                        <Typography className={classes.text} variant="button" style={{height: 36, width: "100%"}}>
                            {field.label.toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            checked={value}
                            onChange={handleChange}
                            name="checkedA"
                            inputProps={{"aria-label": "secondary checkbox"}}
                        />
                    </Grid>
                </React.Fragment>
                :
                <Switch
                    checked={value}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{"aria-label": "secondary checkbox"}}
                />
            }

        </Grid>
    );
});

export default withStyles(styles)(BooleanPluginField);