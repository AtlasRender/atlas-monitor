/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 20:09
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Divider, Grid, IconButton, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import AddIcon from '@material-ui/icons/Add';
import Stylable from "../../../../interfaces/Stylable";

/**
 * TopicWithButtonPropsStyled - interface for TopicWithButton function
 * @interface
 * @author Nikita Nesterov
 */
interface TopicWithButtonPropsStyled extends Stylable {
    children?: string,
}

/**
 * TopicWithButton - function that is used in OrganizationPageView component for fast creating topic with AddIcon
 * @function
 * @author Nikita Nesterov
 */
const TopicWithButton = React.forwardRef((props: TopicWithButtonPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        children
    } = props;
    return (
        <Grid container className={classes.container}>
            <Grid item xs={10}>
                <Grid container className={classes.childAlign}>
                    <Grid item xs={11}>
                        <Typography variant="h6">{children}</Typography>
                    </Grid>
                    <Grid item xs={1} className={classes.box}>
                        <IconButton><AddIcon/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Divider/>
            </Grid>
        </Grid>
    );
})


export default withStyles(styles)(TopicWithButton)
