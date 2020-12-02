/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React, {Ref} from "react";
import {
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    withStyles
} from "@material-ui/core";
import styles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import Stylable from "../../../../interfaces/Stylable";
import List from "@material-ui/core/List";

/**
 * TopicWithButtonPropsStyled - interface for TopicWithButton function
 * @interface
 * @author Nikita Nesterov
 */
interface TopicWithButtonProps extends Stylable {
    children?: string,

    onClick?(): void,
}

/**
 * TopicWithButton - function that is used in OrganizationPageView component for fast creating topic with AddIcon
 * @function
 * @author Nikita Nesterov
 */
const TopicWithButton = React.forwardRef((props: TopicWithButtonProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        children,
        onClick,
    } = props;
    return (
        <Grid container className={classes.firstLine}>
            <Grid item xs={12} md={10}>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem className={classes.paddingNone}>
                        <ListItemText primary={children} primaryTypographyProps={{variant: "h6"}}/>
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={onClick}
                            >
                                <AddIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                </List>
            </Grid>
        </Grid>
    );
});


export default withStyles(styles)(TopicWithButton);
