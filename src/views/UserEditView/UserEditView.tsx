/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 05.11.2020, 22:14
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Avatar,
    Box, Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";
import useAuth from "../../hooks/useAuth";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import useCoreRequest from "../../hooks/useCoreRequest";
import UserData from "../../interfaces/UserData";
import {useChangeRoute} from "routing-manager";
import {Route, Switch, useRouteMatch} from "react-router-dom";

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
    let {path} = useRouteMatch();


    const [user, setUser] = useState<UserData | null>(null);


    useEffect(() => {
        handleGetUser();
    }, []);


    function handleGetUser() {
        const userId = getUser()?.id;
        coreRequest()
            .get(`users/${userId}`)
            .then((response) => {
                setUser(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("No such user");
            });
    }

    function handleEditUser() {
        const userId = getUser()?.id;
        coreRequest()
            .post(`users/${userId}`)
            .send()
            .then()
            .catch()
    }

    function handleDeleteUser() {
        const userId = getUser()?.id;
        coreRequest()
            .delete(`users/${userId}`)
            .then()
            .catch()
    }

    return (
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
                                    id="standard-required"
                                    label="Username"
                                    defaultValue="Username"
                                    variant="outlined"
                                />

                                <TextField
                                    className={classes.editField}
                                    fullWidth
                                    required
                                    id="standard-required"
                                    label="Email"
                                    defaultValue="Email"
                                    variant="outlined"
                                />

                                <TextField
                                    className={classes.editField}
                                    fullWidth
                                    required
                                    id="standard-required"
                                    label="Department"
                                    defaultValue="Department"
                                    variant="outlined"
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
                            <Typography variant="h6">
                                Danger Zone
                            </Typography>

                            <Divider className={classes.dangerZoneDivider}/>

                            <Box className={classes.dangerZoneContainer}>
                                <Button
                                    className={classes.dangerZoneButton}
                                    variant="contained"
                                    color="secondary"
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
    );

});

export default withStyles(styles)(UserEditView);