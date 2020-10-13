/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 07.10.2020, 19:42
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
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";
import useAuth from "../../hooks/useAuth";
import useCoreRequest from "../../hooks/useCoreRequest";
import {useChangeRoute} from "routing-manager";
import {useSnackbar} from "notistack";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";

interface SignUpPageProps extends Stylable {

}

interface Credentials {
    username: string;
    password: string;
    email: string;
}

const SignUpPage = React.forwardRef((props: SignUpPageProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        style,
    } = props;

    const {getUser, isLogged, login} = useAuth();
    const {closeSnackbar} = useSnackbar();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const [credentials, setCredentials] = useState<Credentials>({username: "", password: "", email: ""});
    const {changeRoute} = useChangeRoute();
    const coreRequest = useCoreRequest();

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setCredentials(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    function handleRegister(event: React.ChangeEvent<any>) {
        event.preventDefault();
        coreRequest()
            .post("users")
            .send(credentials)
            .then(res => {
                const user = res.body;
                console.log(user);
                if (!user) {
                    //console.error("No such user");
                    enqueueErrorSnackbar("No such user");
                }
                if ((typeof user.id !== "number") ||
                    (typeof user.username !== "string") ||
                    (typeof user.email !== "string") ||
                    (typeof user.bearer !== "string") ||
                    (typeof user.createdAt !== "string") ||
                    (typeof user.updatedAt !== "string") ||
                    (typeof user.deleted !== "boolean")) {
                    enqueueErrorSnackbar("One of parameters has wrong type");
                }
                login(user);
                changeRoute({page: "user"});
            })
            .catch(err => {
                enqueueErrorSnackbar("Register Error");
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
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleRegister}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                variant="outlined"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
});
SignUpPage.displayName = "SignUpPage";
SignUpPage.propTypes = {}

export default withStyles(styles)(SignUpPage);