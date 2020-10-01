/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 17:18
 * All rights reserved.
 */
import React, {Ref} from "react";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import {Avatar, TextField, Grid, Box, Typography} from "@material-ui/core";
import githubAvatar from "./githubAvatar.jpg";
import clsx from "clsx";


interface UserPageViewPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const UserPageView = React.forwardRef((props: UserPageViewPropsStyled, ref: Ref<any>) => {
    const {
        classes, className,
    } = props;
    return (
        <Box>
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Name"
                            value="Nikita NeNesterov"
                            variant="outlined"
                            InputProps={{readOnly:true}}
                            className={clsx(classes.textField, className)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Organization"
                            value="Pathfinder entertainment"
                            variant="outlined"
                            className={clsx(classes.textField, className)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar alt="Who1sthat" src={githubAvatar} className={clsx(classes.avatar, className)}/>
                    </Grid>
            </Grid>
        </Box>
    );
});

export default withStyles(styles)(UserPageView);