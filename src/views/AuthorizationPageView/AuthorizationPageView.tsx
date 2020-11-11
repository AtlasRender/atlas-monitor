/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 07.10.2020, 18:48
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Stylable from "../../interfaces/Stylable";
import {withStyles} from "@material-ui/core";
import styles from "./style"
import useCoreRequest from "../../hooks/useCoreRequest";
import useAuth from "../../hooks/useAuth";
import {ChangeRouteProvider, useChangeRoute} from "routing-manager";
import {useSnackbar} from "notistack";
import {Route, Switch, useRouteMatch} from "react-router-dom";

interface AuthorizationPageViewProps extends Stylable {

}

interface Credentials {
    username: string;
    password: string;
}

interface validationError {
    "usernameError": boolean;
    "passwordError": boolean;
    "usernameMessage": string;
    "passwordMessage": string;
}

const AuthorizationPageView = React.forwardRef((props: AuthorizationPageViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        style
    } = props;

    const {changeRoute} = useChangeRoute();
    const {enqueueSnackbar} = useSnackbar();
    const {login} = useAuth();
    const coreRequest = useCoreRequest();
    const [errors, setErrors] = useState<validationError>(
        {
            usernameError: false,
            usernameMessage: "",
            passwordError: false,
            passwordMessage: "",
        }
    );
    const [credentials, setCredentials] = useState<Credentials>({username: "", password: ""});

    // TODO event type
    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setErrors(prev => ({...prev, [event.target.name+"Error"]: false}))
        setCredentials(prev => ({...prev, [event.target.name]: event.target.value}));
    }


    function handleLogin(event: React.ChangeEvent<any>) {

        event.preventDefault();
        coreRequest()
            .post("login")
            .send(credentials)
            .then(res => {
                console.log(res.body);
                const user = res.body;
                if (!user) {
                    console.error("No user");
                    enqueueSnackbar("No such user", {variant: "error"});
                }
                if ((typeof user.id !== "number") ||
                    (typeof user.username !== "string") ||
                    (typeof user.email !== "string") ||
                    (typeof user.bearer !== "string") ||
                    (typeof user.createdAt !== "string") ||
                    (typeof user.deleted !== "boolean")) {
                    enqueueSnackbar("One of parameters has wrong type", {variant: "error"});
                }

                login(user);
                changeRoute({page: `user/${user.id}`});
            })
            .catch(err => {
                switch (err.status) {
                    case 400:
                        err.response.body.response.errors.map((item: any) => {
                            console.log(item);
                            const keyError = item.dataPath.substr(1) + "Error";
                            const keyMessage = item.dataPath.substr(1) + "Message";
                            switch (item.keyword) {
                                case "format":
                                    setErrors((prev) => ({
                                        ...prev,
                                        [keyError]: true,
                                        [keyMessage]: `${item.dataPath.substr(1)} has invalid format`
                                    }));
                                    break;
                                case "minLength":
                                    setErrors((prev) => ({
                                        ...prev,
                                        [keyError]: true,
                                        [keyMessage]: `${item.dataPath.substr(1)} is too short`
                                    }));
                                    break;
                                case "maxLength":
                                    setErrors((prev) => ({
                                        ...prev,
                                        [keyError]: true,
                                        [keyMessage]: `${item.dataPath.substr(1)} is too long`
                                    }));
                                    break;
                                case "pattern":
                                    setErrors((prev) => ({
                                        ...prev,
                                        [keyError]: true,
                                        [keyMessage]: `${item.dataPath.substr(1)} has wrong pattern`
                                    }));
                                    break;
                            }
                        });
                        break;
                    case 404:
                        setErrors((prev)=>({...prev, usernameError:true, usernameMessage: "There is no such user"}));
                        break;
                    case 401:
                        setErrors((prev)=>({...prev, passwordError:true, passwordMessage:"Incorrect passsword"}));
                        break;
                    default:
                        enqueueSnackbar("Unrecognized Error");
                }
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={errors.usernameError}
                    helperText={errors.usernameMessage}
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleInput}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={errors.passwordError}
                    helperText={errors.passwordMessage}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleInput}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="" variant="body2" onClick={() => changeRoute({page: "signUp"})}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
});

export default withStyles(styles)(AuthorizationPageView);