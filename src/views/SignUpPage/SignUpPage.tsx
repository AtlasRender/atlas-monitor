/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
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
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import User from "../../entities/User";

interface SignUpPageProps extends Stylable {

}

interface Credentials {
    username: string;
    password: string;
    email: string;
}

interface validationError {
    "usernameError": boolean;
    "emailError": boolean;
    "passwordError": boolean;
    "usernameMessage": string;
    "emailMessage": string;
    "passwordMessage": string;
}

const SignUpPage = React.forwardRef((props: SignUpPageProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        style,
    } = props;

    const {login} = useAuth();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const [errors, setErrors] = useState<validationError>(
        {
            usernameError: false,
            usernameMessage: "",
            emailError: false,
            emailMessage: "",
            passwordError: false,
            passwordMessage: "",
        }
    );
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
                if (!user) {
                    enqueueErrorSnackbar("No such user");
                }
                const currentUser = new User(user);
                login(currentUser);
                changeRoute({page: `user/${user.id}`});
            })
            .catch(err => {
                switch (err.status) {
                    case 400:
                        err.response.body.response.errors.forEach((item: any) => {
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
                    case 401:
                        enqueueErrorSnackbar(err.response.body.response.errors.message);
                        break;
                    default:
                        enqueueErrorSnackbar("Unrecognized Error");
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
                    Sign up
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="username"
                            variant="outlined"
                            error={errors.usernameError}
                            required
                            fullWidth
                            name="username"
                            label="Username"
                            helperText={errors.usernameMessage}
                            autoFocus
                            onChange={handleInput}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            error={errors.emailError}
                            helperText={errors.emailMessage}
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
                            error={errors.passwordError}
                            helperText={errors.passwordMessage}
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
                    onClick={handleRegister}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="" variant="body2"
                              onClick={() => changeRoute({page: "authorization"})}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
});
SignUpPage.displayName = "SignUpPage";
SignUpPage.propTypes = {};

export default withStyles(styles)(SignUpPage);