/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Divider, Grid, IconButton, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import Stylable from "../../../../interfaces/Stylable";

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
        <Grid container className={clsx(classes.container, className)} style={style}>
            <Grid item xs={10}>
                <Grid container className={classes.childAlign}>
                    <Grid item xs={11}>
                        <Typography variant="h6">{children}</Typography>
                    </Grid>
                    <Grid item xs={1} className={classes.box}>
                        <IconButton onClick={onClick}><AddIcon/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Divider/>
            </Grid>
        </Grid>
    );
});


export default withStyles(styles)(TopicWithButton);
