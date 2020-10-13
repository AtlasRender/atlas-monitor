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
import {FormControl, FormLabel, withStyles} from "@material-ui/core";
import styles from "./style"
import useCoreRequest from "../../hooks/useCoreRequest";
import useAuth from "../../hooks/useAuth";
import {useChangeRoute} from "routing-manager";
import {useSnackbar} from "notistack";

interface AuthorizationPageViewProps extends Stylable {

}

interface Credentials {
    username: string;
    password: string;
}

const AuthorizationPageView = React.forwardRef((props: AuthorizationPageViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        style,
    } = props;

    const {changeRoute} = useChangeRoute();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const {getUser, isLogged, login} = useAuth();
    const coreRequest = useCoreRequest();
    const [credentials, setCredentials] = useState<Credentials>({username: "", password: ""});

    // TODO event type
    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
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
                changeRoute({page: "user"});
            })
            .catch(err => {
                enqueueSnackbar("Authorization Error", {variant: "error"});
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
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
});

export default withStyles(styles)(AuthorizationPageView);