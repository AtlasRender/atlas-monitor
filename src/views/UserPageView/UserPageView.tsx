/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */
import React, {Ref, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    useMediaQuery,
    useTheme,
    withStyles
} from "@material-ui/core";
import styles from "./styles";
import githubAvatar from "./githubAvatar.jpg";
import DataTextField from "../../components/DataTextField";
import clsx from "clsx";
import TokensViewer from "./LocalComponents/TokensViewer";
import Stylable from "../../interfaces/Stylable";
import useCoreRequest from "../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import useAuth from "../../hooks/useAuth";
import UserData from "../../interfaces/UserData";
import {useChangeRoute} from "routing-manager";
import Token from "../../interfaces/Token";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import List from "@material-ui/core/List";
import SettingsIcon from "@material-ui/icons/Settings";
import Loading from "../../components/Loading";
import ErrorHandler from "../../utils/ErrorHandler";

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

    const {getUser, logout} = useAuth();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const coreRequest = useCoreRequest();
    const [userData, setUserData] = useState<UserData | null>(null);
    const {getRouteParams, changeRoute} = useChangeRoute();
    const {id} = getRouteParams();
    const [tokens, setTokens] = useState<Token[]>([]);
    const [editedUser, setEditedUser] = useState();
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        Promise.all([
            handleGetUser(),
            handleGetToken(),
        ]).then(() => {
            setLoaded(true);
        });
    }, []);


    async function handleGetToken() {
        try {
            const response = await coreRequest().get(`tokens`);
            setTokens(response.body);
        } catch (err) {
            const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
            errorHandler
                .on(401, () => {logout()})
                .handle(err);
        }
    }

    async function handleGetUser() {
        const user = getUser();
        let userId = id;
        if (!userId) {
            userId = user?.id;
        }
        try {
            const response = await coreRequest().get(`users/${userId}`);
            setUserData(response.body);
        } catch (err) {
            const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
            errorHandler
                .on(401, () => {logout()})
                .on(404, "User not found")
                .handle(err);
        }
    }

    function handleEditUser() {
        const userId = getUser()?.id;
        coreRequest()
            .post(`users/${userId}`)
            .send()
            .then()
            .catch();
    }

    function handleDeleteUser() {
        const userId = getUser()?.id;
        coreRequest()
            .delete(`users/${userId}`)
            .then()
            .catch();
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
                <Grid item xs={4}>
                    <Button
                        onClick={() => changeRoute({page: `user`, id: getUser()?.id, actions: "edit"})}
                    >
                        Edit Profile
                    </Button>
                </Grid>
            </Grid>
        );
    } else {
        mainInfo = (
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs={12} className={clsx(classes.container, classes.root, className)}>
                    <Avatar src={githubAvatar} className={clsx(classes.avatar)}/>
                </Grid>
                <Grid item xs={12} md={10}>
                    <DataTextField label="Name" children={userData?.username}/>
                </Grid>
                <Grid item xs={12} md={10}>
                    <DataTextField label="Department" children="Pathfinder team crew"/>
                </Grid>
            </Grid>
        );
    }

    let {path} = useRouteMatch();

    return (
        loaded ?
            <Switch>
                <Route path={path}>
                    <Box style={style} className={className}>
                        {mainInfo}
                        <Grid container className={classes.firstLine}>
                            <Grid item xs={12} md={10}>
                                <List component="nav" aria-label="secondary mailbox folders">
                                    <ListItem className={classes.paddingNone}>
                                        <ListItemText primary="Organizations" primaryTypographyProps={{variant: "h6"}}/>
                                    </ListItem>
                                    <Divider/>
                                </List>
                            </Grid>
                        </Grid>

                        {/*TODO If no organisation print smth else*/}

                        <Grid container className={classes.firstLine}>
                            <Grid item xs={12} md={10}>
                                <List>
                                    {userData?.organizations.map((organization) => {
                                        return (
                                            <ListItem
                                                key={organization.id}
                                                button
                                                onClick={() => {
                                                    changeRoute({page: "organization", id: organization.id});
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg"
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={organization.name}
                                                    secondary={organization.description}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={"MainRole"}
                                                        style={{backgroundColor: `#f76`}}
                                                    />
                                                    <IconButton
                                                        edge="end"
                                                    >
                                                        <SettingsIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        <TokensViewer/>
                    </Box>
                </Route>
            </Switch>
            :
            <Box className={classes.loading}>
                <Loading/>
            </Box>
    );
});

export default withStyles(styles)(UserPageView);