/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 17:18
 * All rights reserved.
 */
import React, {Ref, useEffect, useState} from "react";
import {Button, IconButton, withStyles} from "@material-ui/core";
import styles from "./styles";
import {Avatar, Grid, Box, Typography, Divider, useTheme, useMediaQuery} from "@material-ui/core";
import githubAvatar from "./githubAvatar.jpg";
import DataTextField from "../../components/DataTextField";
import OrganizationsFieldsRow from "./LocalComponents/OrganizationsFieldsRow";
import clsx from "clsx";
import TokensViewer from "./LocalComponents/TokensViewer";
import Stylable from "../../interfaces/Stylable";
import useCoreRequest from "../../hooks/useCoreRequest";
import {useSnackbar} from "notistack";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import useAuth from "../../hooks/useAuth";
import UserData from "../../interfaces/UserData";
import {useChangeRoute} from "routing-manager";
import Token from "../../interfaces/Token";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * UserPageViewPropsStyled - interface for UserPageView
 * @interface
 * @author Nikita Nesterov
 */
interface UserPageViewProps extends Stylable {

}

/**
 * UserPageView - function for showing user page
 * @function
 * @author NikitaNesterov
 */
const UserPageView = React.forwardRef((props: UserPageViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        style,
    } = props;

    const {getUser} = useAuth();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const coreRequest = useCoreRequest();
    const [userData, setUserData] = useState<UserData | null>(null);
    const {getRouteParams} = useChangeRoute();
    const {panel} = getRouteParams();
    const [tokens, setTokens] = useState<Token[]>([]);
    useEffect(() => {
        handleGetUser();
    }, []);

    useEffect(() =>{
        handleGetToken();
    }, []);

    function handleGetToken(){
        coreRequest()
            .get(`tokens`)
            .then((response) => {
                console.log(response.body);
                setTokens(response.body);
            })
            .catch(err => {
                enqueueErrorSnackbar("No such token");
            })

    }

    function handleGetUser() {
        //TODO if user is empty redirect to login page
        const user = getUser();
        let userId = panel;
        if (!userId) {
            userId = user?.id;
        }
        coreRequest()
            .get(`users/${userId}`)
            .then((response) => {
                setUserData(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("No such user");
            });
    }

    function handleTokenAdd(){

    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let mainInfo;
    if (matches) {
        mainInfo = (
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs={4}>
                    <DataTextField label="Name" children={userData?.username}/>
                </Grid>
                <Grid item xs={4}>
                    <DataTextField label="Department" children="Pathfinder team crew"/>
                </Grid>
                <Grid item xs={2}>
                    <Avatar alt="Who1sthat" src={githubAvatar} className={clsx(classes.avatar, className)}/>
                </Grid>
            </Grid>
        );
    } else {
        mainInfo = (
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
                <Grid item xs={10} className={clsx(classes.topic, className)}>
                    <Typography variant="h6">Organizations</Typography>
                    <Divider/>
                </Grid>
            </Grid>
            {/*TODO If no organisation print smth else*/}
            {userData?.organizations.map((organization) =>
                <OrganizationsFieldsRow
                    organization={organization.name}
                    key={organization.id}
                    role="admin"
                    status="working"
                />
            )}
            <TokensViewer/>
        </Box>
    );
});

export default withStyles(styles)(UserPageView);