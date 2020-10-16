/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 11:19
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./styles";
import DataTextField from "../../../../components/DataTextField/DataTextField";
import Stylable from "../../../../interfaces/Stylable";
import useCoreRequest from "../../../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";
import ListItemProgress from "../../../../components/ListItemProgress/ListItemProgress";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Token from "../../../../interfaces/Token";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserToken from "../../../../entities/UserToken";
import CloseIcon from '@material-ui/icons/Close';


/**
 * TokensViewerPropsStyled - interface for TokensViewer function
 * @interface
 * @author Nikita Nesterov
 */
interface TokensViewerProps extends Stylable {

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
    }

    function handleRemoveToken(tokenId: number) {
        setTokens(tokens?.filter(token => token.id !== tokenId));
        coreRequest()
            .delete(`tokens/${tokenId}`)
            .then((response => {
                handleGetTokens();
            }))
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar(err.message);
            });
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    function handleIsButtonActive() {
        setIsButtonActive(true);
    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    let tokenView;
    if (matches) {
        tokenView = (
            <Grid container className={clsx(classes.container, className)}>
                <Grid item xs={10}>
                    <List component="nav" aria-label="secondary mailbox folders" className={classes.paddingNone}>
                        <ListItem>
                            <ListItemText primary="Token" primaryTypographyProps={{variant: "h6"}}/>
                            <ListItemSecondaryAction>
                                {isOpen &&
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
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
                        <ListItem>
                            <ListItemText primary="Add new token"/>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        autoFocus
                                        onChange={handleInputToken}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
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
                                    className={classes.submit}
                                    onClick={handleAddToken}
                                >
                                    Add Token
                                </Button>

                            </Grid>
                        </ListItem>
                        }
                        {lastAddedToken &&
                        <ListItem className={classes.lastToken}>
                            <ListItemText
                                primary={lastAddedToken?.token}
                                secondary={"Запоминайте бо пизда"}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="close"
                                    onClick={() => setLastAddedToken(null)}
                                >
                                    <CloseIcon color="inherit"/>
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
    } else {
        tokenView = (
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs={10}>
                    <DataTextField label={description} children={token}/>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box>
            {tokenView}
        </Box>
    );
})

export default withStyles(styles)(TokensViewer)
