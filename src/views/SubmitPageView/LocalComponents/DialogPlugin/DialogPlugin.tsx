/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 22:45
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Box, Button,
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    Typography,
    withStyles,
} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";
import useAuth from "../../../../hooks/useAuth";
import useCoreRequest from "../../../../hooks/useCoreRequest";
import Plugin from "../../../../interfaces/Plugin";
import Loading from "../../../../components/Loading/Loading";
import PluginPreview from "../../../../interfaces/PluginPreview";

interface DialogPluginProps extends Stylable {
    open: boolean;

    onClose(): void;

    getPlugin(plugin: PluginPreview): void;
}


const DialogPlugin = React.forwardRef((props: DialogPluginProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        onClose,
        getPlugin
    } = props;


    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const {getUser} = useAuth();
    const coreRequest = useCoreRequest();


    const [loaded, setLoaded] = useState<boolean>(false);
    const [plugins, setPlugins] = useState<Plugin[]>([]);
    const [chosenPlugin, setChosenPlugin] = useState<PluginPreview | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [filterPlugins, setFilterPlugins] = useState<Plugin[]>([]);


    useEffect(() => {
        setFilterPlugins(plugins.filter(plugin => plugin.name.toLowerCase().includes(searchValue)));
    }, [searchValue]);


    useEffect(() => {
        Promise.all([
            handleGetPlugins(),
        ]).then(() => {
            setLoaded(true);
        });
    }, []);


    async function handleGetPlugins() {
        const id = getUser()?.id;
        try {
            const userOrganizations = await coreRequest().get(`users/${id}/organizations`);
            const response = await coreRequest().get("plugins").query({organization: userOrganizations.body[0].id});
            setPlugins(response.body);
            setFilterPlugins(response.body);
        } catch (err) {
            enqueueErrorSnackbar("Cant get plugins");
        }
    };

    const handleGetPlugin = (pluginId: number) => {
        coreRequest()
            .get(`/plugins/${pluginId}/preview`)
            .then(response => {
                setChosenPlugin(response.body);
            })
            .catch(err => {
                enqueueErrorSnackbar("Cant get plugin");
            });
    };

    function handleOnClose() {
        onClose();
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value.toLowerCase());
    }

    function handleSubmit() {
        if(chosenPlugin) {
            getPlugin(chosenPlugin);
        }
        onClose();
        console.log("kuku");
    }

    return (
        <Dialog
            open={open}
            onClose={handleOnClose}
            maxWidth={false}
        >
            {loaded ?
                <Box className={classes.dialog}>
                    <DialogTitle className={classes.paddingNoneBottom}>
                        Select Plugin
                    </DialogTitle>

                    <List>


                        <Grid container>
                            <Grid item xs={5}>
                                <ListItem className={classes.paddingNoneBottom}>
                                    <Box className={classes.search}>
                                        <Box className={classes.searchIcon}>
                                            <SearchIcon/>
                                        </Box>
                                        <InputBase
                                            onChange={handleSearch}
                                            placeholder="Search…"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{"aria-label": "search"}}
                                        />
                                    </Box>
                                    <IconButton style={{padding: 8}}>
                                        <CloseIcon/>
                                    </IconButton>
                                </ListItem>
                                <Grid container style={{height: 220, overflow: "auto"}}>
                                    {filterPlugins.length !== 0 ? filterPlugins.map(plugin => {
                                        return (
                                            <Grid item xs={12} key={plugin.id}>
                                                <ListItem
                                                    button
                                                    onClick={() => handleGetPlugin(plugin.id)}
                                                >
                                                    {plugin.name}
                                                </ListItem>
                                            </Grid>
                                        );
                                    }) :
                                    <Box className={classes.notFound}>
                                        <Typography variant="h5" color="textSecondary">
                                            No plugins found
                                        </Typography>
                                    </Box>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                {chosenPlugin ?
                                    <Box>
                                        <Typography variant="h6">
                                            name: {chosenPlugin.name}
                                        </Typography>
                                        <Typography variant="h6">
                                            version: {chosenPlugin.version}
                                        </Typography>
                                        <Typography variant="h6">
                                            description: {chosenPlugin.description}
                                        </Typography>
                                        <Typography variant="h6">
                                            note: {chosenPlugin.note}
                                        </Typography>
                                        <Typography variant="h6">
                                            readme: {chosenPlugin.readme}
                                        </Typography>
                                    </Box>

                                    :
                                    <Typography variant="h6">
                                        No plugin selected
                                    </Typography>
                                }

                            </Grid>
                        </Grid>


                    </List>

                    <Button fullWidth onClick={() => handleSubmit()}>
                        Submit
                    </Button>

                </Box>
                :
                <Box className={classes.loading}>
                    <Loading/>
                </Box>
            }
        </Dialog>
    );
});

export default withStyles(styles)(DialogPlugin);