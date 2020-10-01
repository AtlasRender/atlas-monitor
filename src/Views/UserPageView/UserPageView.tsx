/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 17:18
 * All rights reserved.
 */
import React, {Ref} from 'react';
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import {Avatar, TextField, Box} from '@material-ui/core';
import githubAvatar from './githubAvatar.jpg';
import clsx from "clsx";


interface UserPageViewPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const UserPageView =React.forwardRef((props: UserPageViewPropsStyled, ref: Ref<any>) => {
    const{
        classes, className,
    } = props;
    return (
        <Box className={clsx(classes.root, className)}>
            <Box className={clsx(classes.firstLine, className)}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Name"
                    multiline
                    //rowsMax={1}
                    value="name"
                    //variant="outlined"
                    className = {clsx(classes.textField, className)}
                />
                <Avatar alt = 'Who1sthat' src = {githubAvatar} className ={clsx(classes.avatar, className)}/>
            </Box>
        </Box>
    );
});

export default withStyles(styles)(UserPageView);