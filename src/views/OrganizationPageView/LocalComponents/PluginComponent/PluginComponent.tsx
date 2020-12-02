/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from "react";
import {
    Grid,
    IconButton, List,
    ListItem, ListItemIcon, ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select, Typography,
    useMediaQuery,
    useTheme,
    withStyles,
} from "@material-ui/core";
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

    return (
        <Grid container spacing={0} className={classes.container}>
            <Grid item xs={10}>
                <List className={classes.listRoot}>
                    <ListItem style={style} className={className}>
                        <ListItemText primary={plugin} secondary={description}/>
                        <ListItemSecondaryAction>
                            <IconButton>
                                <CloseIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
});

export default withStyles(styles)(PluginComponent);