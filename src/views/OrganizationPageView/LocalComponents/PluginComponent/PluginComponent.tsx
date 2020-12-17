/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, withStyles,} from "@material-ui/core";
import styles from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import Stylable from "../../../../interfaces/Stylable";
import Plugin from "../../../../interfaces/Plugin";

/**
 * PluginComponentPropsStyled - interface for PluginComponent function
 * @interface
 * @author Nikita Nesterov
 */
interface PluginComponentProps extends Stylable {
    plugin: Plugin,
    can?: boolean,

    invokeDialog(): void,

    setCurrentPlugin(id: number): void,
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
        invokeDialog,
        setCurrentPlugin,
        can = true,
    } = props;

    return (
        <Grid container spacing={0} className={classes.container}>
            <Grid item xs={10}>
                <List className={classes.listRoot}>
                    <ListItem style={style} className={className} button onClick={() => {
                        invokeDialog();
                        setCurrentPlugin(plugin.id);
                    }}>
                        <ListItemText primary={plugin.name} secondary={plugin.description}/>
                        {can &&
                        <ListItemSecondaryAction>
                            <IconButton>
                                <CloseIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                        }
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
});

export default withStyles(styles)(PluginComponent);