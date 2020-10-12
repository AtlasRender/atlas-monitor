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
import {Avatar, Grid, Box, Typography, Divider,useTheme, useMediaQuery} from "@material-ui/core";
import githubAvatar from "./githubAvatar.jpg";
import DataTextField from "../../components/DataTextField";
import OrganizationsFieldsRow from "./LocalComponents/OrganizationsFieldsRow";
import clsx from "clsx";
import TokensViewer from "./LocalComponents/TokensViewer";
import Stylable from "../../interfaces/Stylable";

/**
 * UserPageViewPropsStyled - interface for UserPageView
 * @interface
 * @author Nikita Nesterov
 */
interface UserPageViewPropsStyled extends Stylable{

}

/**
 * UserPageView - function for showing user page
 * @function
 * @author NikitaNesterov
 */
const UserPageView = React.forwardRef((props: UserPageViewPropsStyled, ref: Ref<any>) => {
    const {
        classes, className, style
    } = props;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let mainInfo;
    if(matches){
        mainInfo=(
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs={4}>
                    <DataTextField label="Name" children="Nikita Nesterov"/>
                </Grid>
                <Grid item xs={4}>
                    <DataTextField label="Department" children="Pathfinder team crew"/>
                </Grid>
                <Grid item xs={2}>
                    <Avatar alt="Who1sthat" src={githubAvatar} className={clsx(classes.avatar, className)}/>
                </Grid>
            </Grid>
        );
    }
    else{
        mainInfo=(
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs={12} className={clsx(classes.container, classes.root, className)}>
                    <Avatar src={githubAvatar} className={clsx(classes.avatar)}/>
                </Grid>
                <Grid item xs={10}>
                    <DataTextField label="Name" children="Nikita Nesterov"/>
                </Grid>
                <Grid item xs={10}>
                    <DataTextField label="Department" children="Pathfinder team crew"/>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box>
            {mainInfo}
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs = {10} className={clsx(classes.topic, className)}>
                    <Typography variant="h6">Organizations</Typography>
                    <Divider/>
                </Grid>
            </Grid>
            <OrganizationsFieldsRow organization="Reveille" role="admin" status="working"/>
            <OrganizationsFieldsRow organization="Maya3D" role="user" status="training"/>
            <OrganizationsFieldsRow organization="Microsoft" role="Bill Gates" status="on vacation"/>
            <TokensViewer/>
        </Box>
    );
});

export default withStyles(styles)(UserPageView);