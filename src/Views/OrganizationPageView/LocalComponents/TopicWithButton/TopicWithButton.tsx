/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 20:09
 * All rights reserved.
 */

import React, {Ref} from "react";
import {IconButton, withStyles} from "@material-ui/core";
import {Avatar, Grid, Box, Typography, Divider} from "@material-ui/core";
import clsx from "clsx";
import styles from "./styles";
import AddIcon from '@material-ui/icons/Add';


interface TopicWithButtonPropsStyled{
    classes?: any;
    style?: any;
    className?: string;
    children?:string,
}

const TopicWithButton = React.forwardRef((props:TopicWithButtonPropsStyled)=>{
    const{
        classes,
        style,
        className,
        children
    } = props;
    return(
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
            <Grid item xs ={10}>
                <Divider/>
            </Grid>
        </Grid>
    );
})


export default withStyles(styles)(TopicWithButton)
