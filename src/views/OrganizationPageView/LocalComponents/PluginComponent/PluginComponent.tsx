/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Grid, IconButton, ListItem, MenuItem, Select, useMediaQuery, useTheme, withStyles,} from "@material-ui/core";
import styles from "./styles";
import DataTextField from "../../../../components/DataTextField";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import Stylable from "../../../../interfaces/Stylable";

/**
 * PluginComponentPropsStyled - interface for PluginComponent function
 * @interface
 * @author Nikita Nesterov
 */
interface PluginComponentProps extends Stylable {
    plugin?: string;
    description?: string;
}

/**
 * PluginComponent - function that returns one row for plugins list in OrganizationPage
 * @function
 * @author Nikita Nesterov
 */
const PluginComponent = React.forwardRef((props: PluginComponentProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        plugin,
        description,
    } = props;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let item;
    if (matches) {
        item = (
            <Grid container spacing={0} className={classes.container}>
                <Grid item xs={10} className={classes.containerItem}>
                    <Grid item xs={2} style={{padding: 0}}>
                        <DataTextField label="Plugin name" children={plugin} className={classes.dataTextFieldFix}/>
                    </Grid>
                    <Grid item xs={2} className={clsx(classes.container, classes.selectAlignment)}>
                        <Select
                            value="v.1.0.1"
                            className={classes.container}
                        >
                            <MenuItem value={"v.1.0.1"}>v.1.0.1</MenuItem>
                            <MenuItem value={"v.1.0.2"}>v.1.0.2</MenuItem>
                            <MenuItem value={"v.1.0.3"}>v.1.0.3</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={4} className={classes.dataTextFieldFix}>
                        <DataTextField label="Description" children={description} className={classes.dataTextFieldFix}/>
                    </Grid>
                    <Grid item xs={1} className={classes.selectAlignment}>
                        <IconButton>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        );
    } else {
        item = (
            <Grid container spacing={0} className={classes.container}>
                <Grid item xs={10} className={classes.containerItem}>
                    <Grid item xs={6} style={{padding: 0}}>
                        <DataTextField label={description} children={plugin} className={classes.dataTextFieldFix}/>
                    </Grid>
                    <Grid item xs={2} className={clsx(classes.container, classes.selectAlignment)}>
                        <Select
                            value="v.1.0.1"
                            className={classes.container}
                        >
                            <MenuItem value={"v.1.0.1"}>v.1.0.1</MenuItem>
                            <MenuItem value={"v.1.0.2"}>v.1.0.2</MenuItem>
                            <MenuItem value={"v.1.0.3"}>v.1.0.3</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    return (
        <ListItem style={style} className={className}>
            {item}
        </ListItem>
    );
});

export default withStyles(styles)(PluginComponent);