/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 01.12.2020, 03:46
 * All rights reserved.
 */

import React from "react";
import {Box, Grid, Switch, Typography, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";


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
        <Grid container className={classes.container}>

            {label ?
                <React.Fragment>
                    <Grid item xs={3} style={{display: "flex", justifyContent: "center"}}>
                        <Typography className={classes.text}>
                            {label}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Switch
                            checked={value}
                            onChange={onChange}
                            name="checkedA"
                            inputProps={{"aria-label": "secondary checkbox"}}
                        />
                    </Grid>
                </React.Fragment>
                :
                <Switch
                    checked={value}
                    onChange={onChange}
                    name="checkedA"
                    inputProps={{"aria-label": "secondary checkbox"}}
                />
            }

        </Grid>
    );
}
);

export default withStyles(styles)(BooleanPluginField);