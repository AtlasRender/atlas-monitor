/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {Avatar, Box, Button, Divider, Grid, TextField, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";
import useAuth from "../../hooks/useAuth";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import useCoreRequest from "../../hooks/useCoreRequest";
import UserData from "../../interfaces/UserData";
import {useChangeRoute} from "routing-manager";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import Loading from "../../components/Loading/Loading";

/**
 * UserEditViewProps - interface for UserEditView
 * @interface
 * @author Andrii Demchyshyn
 */
interface UserEditViewProps extends Stylable {

}

/**
 * UserEditView - function for showing user page
 * @function
 * @author Andrii Demchyshyn
 */
const UserEditView = React.forwardRef((props: UserEditViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;


    const {getUser} = useAuth();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const coreRequest = useCoreRequest();
    const {changeRoute} = useChangeRoute();
    const {logout} = useAuth();
    const confirm = useConfirm();
    let {path} = useRouteMatch();

    const [user, setUser] = useState<UserData | null>(null);
    const [editedUser, setEditedUser] = useState({
        email: user?.email,
        username: user?.username,
        password: "123456"
    });
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        Promise.all([
            handleGetUser(),
        ]).then(() => {
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        setEditedUser({
            email: user?.email,
            username: user?.username,
            password: "123456",
        });
    }, [user]);


    function handleChangeUser(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setEditedUser(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    async function handleGetUser() {
        const userId = getUser()?.id;
        try {
            const response = await coreRequest().get(`users/${userId}`);
            setUser(response.body);
        } catch (err) {
            //TODO handle errors
            enqueueErrorSnackbar("No such user");
        }
    }

    function handleEditUser() {
        const userId = getUser()?.id;
        coreRequest()
            .post(`users/${userId}`)
            .send(editedUser)
            .then(response => {
                changeRoute({page: `user`});
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Can`t edit user");
            });
    }

    function handleDeleteUser() {
        const userId = getUser()?.id;
        coreRequest()
            .delete(`users/${userId}`)
            .send({password: "123456"})
            .then(response => {
                logout();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Can`t delete user");
            });
    }

    return (
        loaded ?
            <Switch>
                <Route path={path}>
                    <Grid container className={classes.firstLine} style={{marginTop: 16}}>
                        <Grid item xs={10}>
                            <Box className={classes.userContainer}>
                                <Box className={classes.editFieldsContainer}>
                                    <TextField
                                        className={classes.editField}
                                        fullWidth
                                        required
                                        label="Username"
                                        name="username"
                                        value={editedUser?.username}
                                        variant="outlined"
                                        onChange={handleChangeUser}
                                        InputLabelProps={{shrink: true}}
                                    />

                                    <TextField
                                        className={classes.editField}
                                        fullWidth
                                        required
                                        label="Email"
                                        name="email"
                                        value={editedUser?.email}
                                        variant="outlined"
                                        onChange={handleChangeUser}
                                        InputLabelProps={{shrink: true}}
                                    />

                                    <TextField
                                        className={classes.editField}
                                        fullWidth
                                        required
                                        id="standard-required"
                                        label="Department"
                                        defaultValue="Department"
                                        variant="outlined"
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Box>
                                <Box className={classes.avatarContainer}>
                                    <Avatar
                                        className={classes.avatar}
                                        src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg"
                                    />
                                </Box>
                            </Box>

                            <Box className={classes.dangerZoneHeader}>
                                <Box className={classes.dangerZoneContainer}>
                                    <Button
                                        className={classes.dangerZoneButton}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEditUser}
                                    >
                                        Save changes
                                    </Button>
                                </Box>
                            </Box>

                            <Box className={classes.dangerZoneHeader}>
                                <Typography variant="h6">
                                    Danger Zone
                                </Typography>

                                <Divider className={classes.dangerZoneDivider}/>

                                <Box className={classes.dangerZoneContainer}>
                                    <Button
                                        className={classes.dangerZoneButton}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => confirm(async () => handleDeleteUser(),
                                            {title: `are you sure to delete user: ${user?.username} ?`})}
                                    >
                                        Delete User
                                    </Button>
                                </Box>

                                <Divider className={classes.dangerZoneDivider}/>
                            </Box>

                        </Grid>
                    </Grid>
                </Route>
            </Switch>
            :
            <Box className={classes.loading}>
                <Loading/>
            </Box>
    );

});

export default withStyles(styles)(UserEditView);