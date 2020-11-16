/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Typography,
    withStyles,
    useTheme,
    useMediaQuery,
    ListItem, ListItemSecondaryAction, Collapse
} from "@material-ui/core";
import clsx from "clsx";
import styles from "./styles";
import Stylable from "../../../../interfaces/Stylable";
import useCoreRequest from "../../../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Token from "../../../../interfaces/Token";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserToken from "../../../../entities/UserToken";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import useEnqueueSuccessSnackbar from "../../../../utils/EnqueSuccessSnackbar";

/**
 * TokensViewerPropsStyled - interface for TokensViewer function
 * @interface
 * @author Nikita Nesterov
 */
interface TokensViewerProps extends Stylable {
    description?: string,
    token?: string,
}

interface ValidationErrors {
    "noInputError": boolean;
    "nameError": boolean;
    "descriptionError": boolean;
}

/**
 * TokensViewer - function for UserPageView component used for fast output(creation) of tokens and their description
 * @function
 * @author Nikita Nesterov
 */
const TokensViewer = React.forwardRef((props: TokensViewerProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        description,
        token,
    } = props;

    const coreRequest = useCoreRequest();
    const [isOpen, setIsOpen] = React.useState(false);
    const [tokens, setTokens] = React.useState<Token[]>();
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    const [newToken, setNewToken] = React.useState({name: "", description: ""});
    const [lastAddedToken, setLastAddedToken] = React.useState<UserToken | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({
        "noInputError": true,
        "nameError": false,
        "descriptionError": false,
    });
    const enqueueSuccessSnackbar = useEnqueueSuccessSnackbar();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();

    useEffect(() => {
        handleGetTokens();
    }, []);

    function handleGetTokens() {
        //TODO if user is empty redirect to login page
        coreRequest()
            .get("tokens")
            .then((response) => {
                console.log(response.body);
                setTokens(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get tokens");
            });
    }

    function handleInputToken(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setNewToken(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    function handleAddToken() {
        if (!errors.noInputError && !errors.nameError && !errors.descriptionError) {
            setIsButtonActive(false);
            coreRequest()
                .post("tokens")
                .send(newToken)
                .then((response) => {
                    //TODO entity
                    setLastAddedToken(response.body);
                    handleGetTokens();
                })
                .catch(err => {
                    //TODO handle errors
                    enqueueErrorSnackbar(err.message);
                });
        } else {
            enqueueErrorSnackbar("Can`t create a token");
        }
    }

    function handleRemoveToken(tokenId: number) {
        setTokens(tokens?.filter(token => token.id !== tokenId));
        coreRequest()
            .delete(`tokens/${tokenId}`)
            .then(response => {
                handleGetTokens();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar(err.message);
            });
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    function handleClose() {
        setIsButtonActive(false);
    }

    function handleIsButtonActive() {
        setIsButtonActive(true);
    }

    async function copyToClipboard(str: any) {
        const el = document.createElement("textarea");
        el.value = str;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        return str;
    }

    function handleValidation(event: React.FocusEvent<HTMLInputElement>) {
        setErrors(prev => ({
            ...prev, "noInputError": false
        }));
        if (event.target.name === "name") {
            if (!newToken.name.slice(0, 1).match(/^[a-zA-Z]+$/) || !newToken.name || newToken.name.length > 50) {
                setErrors(prev => ({
                    ...prev, "nameError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "nameError": false
                }));
            }
        }
        if (event.target.name === "description") {
            if (!newToken.description || newToken.description.length > 100) {
                setErrors(prev => ({
                    ...prev, "descriptionError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "descriptionError": false
                }));
            }
        }
    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    let tokenView;
    if (matches) {
        tokenView = (
            <Grid container className={clsx(classes.container, className)}>
                <Grid item xs={12} md={10}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItem className={classes.paddingNone}>
                            <ListItemText primary="Token" primaryTypographyProps={{variant: "h6"}}/>
                            <ListItemSecondaryAction>
                                {isOpen &&
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleIsButtonActive}
                                    style={{marginRight: theme.spacing(1)}}
                                >
                                    <AddIcon/>
                                </IconButton>
                                }
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleClick}
                                >
                                    {isOpen ? <ExpandLess/> : <ExpandMore/>}
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                        {isButtonActive &&
                        <ListItem className={classes.newToken}>
                            <Grid container>
                                <Grid item xs={6} className={clsx(classes.tokenAdd, classes.spacingInNewToken)}>
                                    <TextField
                                        error={errors.nameError}
                                        variant="standard"
                                        required
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        onChange={handleInputToken}
                                        onBlur={handleValidation}
                                    />
                                </Grid>
                                <Grid item xs={5} className={clsx(classes.tokenAdd, classes.spacingInNewToken)}>
                                    <TextField
                                        error={errors.descriptionError}
                                        variant="standard"
                                        required
                                        fullWidth
                                        name="description"
                                        label="Description"
                                        onChange={handleInputToken}
                                        onBlur={handleValidation}
                                    />
                                </Grid>
                                <Grid item xs={1} className={classes.createTokenControls}>
                                    <IconButton
                                        onClick={handleClose}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                    <IconButton onClick={handleAddToken}><CheckIcon/></IconButton>
                                </Grid>
                            </Grid>
                        </ListItem>
                        }
                        {lastAddedToken &&
                        <ListItem
                            button
                            classes={{button: classes.copyClipboardHover}}
                            className={clsx(classes.container, classes.noWrap, classes.lastToken)}
                            onClick={() => {
                                copyToClipboard(lastAddedToken?.token)
                                    .then(res => {
                                        enqueueSuccessSnackbar("successfully copied");
                                    })
                                    .catch(error => {
                                        enqueueErrorSnackbar("failed to copy");
                                    });
                            }}
                        >
                            <Box className={clsx(classes.generatedToken, classes.wrapWord)}>
                                <Typography variant="h6">{lastAddedToken?.token}</Typography>
                                <Typography variant="caption">This will never be shown again (Click to
                                    copy)</Typography>
                            </Box>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="close"
                                    style={{marginRight: theme.spacing(1)}}
                                    onClick={() => setLastAddedToken(null)}

                                >
                                    <CloseIcon className={classes.closeButtonColor}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        }
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            {tokens?.map((token) =>
                                <ListItem
                                    key={`render-job-${token.id}`}
                                >
                                    <ListItemText primary={token.name} secondary={token.description}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleRemoveToken(token.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        );
    } else {
        tokenView = (
            tokenView = (
                <Grid container className={clsx(classes.container, className)}>
                    <Grid item xs={12} md={10}>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem className={classes.paddingNone}>
                                <ListItemText primary="Token" primaryTypographyProps={{variant: "h6"}}/>
                                <ListItemSecondaryAction>
                                    {isOpen &&
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        style={{marginRight: theme.spacing(0)}}
                                        onClick={handleIsButtonActive}
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                    }
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={handleClick}
                                    >
                                        {isOpen ? <ExpandLess/> : <ExpandMore/>}
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                            {isButtonActive &&
                            <ListItem className={classes.newToken}>
                                <Grid container className={classes.newToken}>
                                    <Grid item xs={12} className={classes.tokenAdd}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="name"
                                            label="Name"
                                            autoFocus
                                            onChange={handleInputToken}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={clsx(classes.tokenAdd, classes.topMargin)}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="description"
                                            label="Description"
                                            autoFocus
                                            onChange={handleInputToken}
                                        />
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={clsx(classes.tokenAdd, classes.topMargin)}
                                        onClick={handleAddToken}
                                    >
                                        Add Token
                                    </Button>

                                </Grid>
                            </ListItem>
                            }
                            {lastAddedToken &&
                            <ListItem
                                button
                                classes={{button: classes.copyClipboardHover}}
                                className={clsx(classes.container, classes.noWrap, classes.lastToken)}
                                onClick={() => {
                                    copyToClipboard(lastAddedToken?.token)
                                        .then(res => {
                                            enqueueSuccessSnackbar("successfully copied");
                                        })
                                        .catch(error => {
                                            enqueueErrorSnackbar("failed to copy");
                                        });
                                }}
                            >
                                <Box className={clsx(classes.generatedToken)}>
                                    <Typography
                                        variant="h6"
                                        className={classes.wrapWord}
                                    >
                                        {lastAddedToken?.token}
                                    </Typography>
                                    <Typography variant="caption">This will never be shown again</Typography>
                                </Box>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="close"
                                        style={{marginRight: theme.spacing(1)}}
                                        onClick={() => setLastAddedToken(null)}

                                    >
                                        <CloseIcon className={classes.closeButtonColor}/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            }
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                {tokens?.map((token) =>
                                    <ListItem
                                        key={`render-job-${token.id}`}
                                    >
                                        <ListItemText primary={token.name} secondary={token.description}/>
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleRemoveToken(token.id)}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                            </Collapse>
                        </List>
                    </Grid>
                </Grid>
            )
        );
    }

    return (
        <Box>
            {tokenView}
        </Box>
    );
});

export default withStyles(styles)(TokensViewer);
