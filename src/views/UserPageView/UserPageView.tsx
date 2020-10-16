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
import {Avatar, Grid, Box, Typography, Divider,useTheme, useMediaQuery} from "@material-ui/core";
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
import User from "../../interfaces/User";
import {useChangeRoute} from "routing-manager";
import Token from "../../interfaces/Token";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * UserPageViewPropsStyled - interface for UserPageView
 * @interface
 * @author Nikita Nesterov
 */
interface UserPageViewProps extends Stylable{

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
    const [userData, setUserData] = useState<User | null>(null);
    const { getRouteParams } = useChangeRoute();
    const { panel } = getRouteParams();
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
        if(!userId) {
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
    if(matches){
        mainInfo=(
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
            <Grid container className={clsx(classes.containerToken, className)}>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={11} className={classes.typographyToken}>
                            <Typography variant="h6">Tokens</Typography>
                            <Button onClick={handleTokenAdd}>button</Button>
                        </Grid>
                        <Grid item xs={1} className={clsx(classes.box, className)}>
                            <IconButton><ExpandMoreIcon/></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Divider/>
                </Grid>
            </Grid>
            {tokens.map((item)=>{
                return(
                    <TokensViewer key={item.id} description={item.description} token={item.name}/>
                );
            })
            }
        </Box>
    );
});

export default withStyles(styles)(UserPageView);