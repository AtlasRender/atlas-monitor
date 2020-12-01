/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 11.11.2020, 18:01
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Box,
    Button,
    Chip, FormControl,
    Container,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem, Popover,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";
import AddIcon from "@material-ui/icons/Add";
import useAuth from "../../hooks/useAuth";
import UserData from "../../interfaces/UserData";
import useCoreRequest from "../../hooks/useCoreRequest";
import useEnqueueSuccessSnackbar from "../../utils/EnqueSuccessSnackbar";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import Loading from "../../components/Loading";
import Organization from "../../interfaces/Organization";
import Plugin from "../../interfaces/Plugin";
import PluginInput from "./LocalComponents/PluginInput";
import PluginPreview from "../../interfaces/PluginPreview";
import DialogPlugin from "./LocalComponents/DialogPlugin";
import User from "../../interfaces/User";
import IntegerPluginField from "../../components/RenderJobCustomFields/IntegerPluginField";
import {IntegerField, PluginSetting, PluginSettingsSpec} from "@atlasrender/render-plugin";
import validate from "validate.js";
import {useChangeRoute} from "routing-manager";

/**
 * SubmitPagePropsStyled - interface for SubmitPageView function
 * @interface
 * @author Nikita Nesterov
 */
interface SubmitPagePropsStyled extends Stylable {

}

interface FrameRange {
    frameStart: number,
    frameEnd: number,
    step: number,
    startFrom: number,
    renumStep: number,
}

interface Job {
    name: string,
    user: string,
    description: string,
    organization: number,
    //frameRange: FrameRange,
    frameRange: string,
    attempts_per_task_limit: number,
    plugin: number | undefined,
    pluginSettings: object,
}

/**
 * SubmitPageView - function for displaying Submit page
 * @function
 * @author Nikita Nesterov
 */
const SubmitPageView = React.forwardRef((props: SubmitPagePropsStyled, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
    } = props;

    const enqueueSuccessSnackbar = useEnqueueSuccessSnackbar();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const {getUser} = useAuth();
    const {changeRoute} = useChangeRoute();
    const coreRequest = useCoreRequest();

    const user = getUser();
    const [userOrgs, setUserOrgs] = useState<Organization[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [org, setOrg] = useState<string>();
    const [frameRange, setFrameRange] = useState<FrameRange>({
        frameStart: 0,
        frameEnd: 0,
        step: 0,
        startFrom: 0,
        renumStep: 0,
    });
    const [job, setJob] = useState<Job>({
        name: "",
        user: user ? user.username : "",
        description: "",
        organization: userOrgs[0]?.id,
        frameRange: "1-10",
        attempts_per_task_limit: 1,
        plugin: undefined,
        pluginSettings: {},
    });
    const [plugins, setPlugins] = useState<Plugin[]>([]);
    const [chosenPluginName, setChosenPluginName] = useState<string>("");
    const [chosenPlugin, setChosenPlugin] = useState<PluginPreview | null>(null);
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        Promise.all([
            handleGetUser(),
            handleGetPlugins(),
        ]).then(() => {
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        //uncomment when frame range as object will be ready
        //setJob((prev) => ({...prev, ["frameRange"]: frameRange}));
        console.log(job.frameRange);
    }, [frameRange])


    useEffect(() => {
        setJob((prev) => ({...prev, organization: userOrgs[0]?.id}));
    }, [userOrgs]);

    useEffect(() => {
        setJob((prev) => ({...prev, plugin: chosenPlugin?.id}));
    }, [chosenPlugin]);

    function setPluginSetting(field: PluginSetting, value: number | string | null) {
        setJob((prev) => ({...prev, pluginSettings: {...prev.pluginSettings, [field.name]: value}}));
        console.log("plugin setting", job.pluginSettings);
    }


    /**
     * handleGetUser - function for taking info about authorized user
     * @function
     * @author Nikita Nesterov
     */
    async function handleGetUser() {
        const id = getUser()?.id;
        try {
            const response = await coreRequest().get(`users/${id}/organizations`);
            // setUserData(response.body);
            // const defaultUserOrgId = userData?.organizations[0].id;
            // const orgResponse = await coreRequest().get(`organizations/${defaultUserOrgId}`);
            setOrg(response.body[0].name);
            setUserOrgs(response.body);
        } catch (err) {
            enqueueErrorSnackbar("No such user");
        }
    }

    async function handleGetPlugins() {
        const id = getUser()?.id;
        try {
            const userOrganizations = await coreRequest().get(`users/${id}/organizations`);
            const response = await coreRequest().get("plugins").query({organization: userOrganizations.body[0].id});
            setPlugins(response.body);
        } catch (err) {
            enqueueErrorSnackbar("Cant get plugins");
        }
    }

    const handleGetPlugin = (pluginId: number) => {
        coreRequest()
            .get(`/plugins/${pluginId}/preview`)
            .then(response => {
                console.log(response.body);
                setChosenPlugin(response.body);
            })
            .catch(err => {
                enqueueErrorSnackbar("Cant get plugin");
            });
    };

    const handleChangePlugin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChosenPluginName(event.target.value);
        const plugin = plugins.filter(item => item.name === event.target.value);
        handleGetPlugin(plugin[0].id);
    };

    function handleJobParametersChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        console.log("frame change", validate.isInteger(+event.target.value));
        if (validate.isInteger(+event.target.value)) {
            if (event.target.name === "attempts_per_task_limit") {
                setJob((prev) => ({...prev, [event.target.name]: +event.target.value}));
                return;
            } else if (event) {
                setFrameRange((prev) => ({...prev, [event.target.name]: event.target.value}));
            }
        }
    }

    function handleOrgChange(item: any) {
        setOrg(item.name);
        setJob((prev) => ({...prev, organization: item.id}));
        console.log(org);
    }

    function handleGetChosenPlugin(plugin: PluginPreview) {
        setChosenPlugin(plugin);
    }

    /**
     * handleInput - used for writing info from TextFields(name, description) to job state
     * @function
     * @author Nikita Nesterov
     * @params event
     */
    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setJob(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    function handleSubmission() {
        coreRequest()
            .post("jobs")
            .send(job)
            .then(() => {
                enqueueSuccessSnackbar("successfully submitted");
                changeRoute({page:"jobs"});
            })
            .catch(() => {
                enqueueErrorSnackbar("Something went wrong");
            });
    }

    const handleDelete = () => {
        console.info("You clicked the delete icon.");
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const matches = useMediaQuery("(min-width:800px)");
    let submitInfo;
    let renderSettings;
    let plugin;
    let submitButton;
    if (matches) {
        submitInfo = (
            <React.Fragment>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        name="name"
                        required
                        label="Work title"
                        onChange={handleInput}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        label="Description"
                        name="description"
                        value={job.description}
                        onChange={handleInput}
                    />
                </Grid>
                <Grid item xs={3}>
                    <InputLabel id="Organization">Organization</InputLabel>
                    <Select
                        value={org}
                        fullWidth
                        labelId="Organization"
                        required
                    >
                        {userOrgs.map((item) => {
                            return (
                                <MenuItem
                                    key={item.id}
                                    value={item.name}
                                    onClick={() => handleOrgChange(item)}
                                >
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Grid>
            </React.Fragment>
        );
        renderSettings = (
            <Grid container spacing={2} xs={10} className={clsx(classes.container, classes.flexNoWrap)}>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Frame start"
                        name="frameStart"
                        value={frameRange.frameStart}
                        onChange={handleJobParametersChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Frame end"
                        name="frameEnd"
                        value={frameRange.frameEnd}
                        onChange={handleJobParametersChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Step"
                        name="step"
                        value={frameRange.step}
                        onChange={handleJobParametersChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Start from"
                        name="startFrom"
                        value={frameRange.startFrom}
                        onChange={handleJobParametersChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Renum step"
                        name="renumStep"
                        value={frameRange.renumStep}
                        onChange={handleJobParametersChange}/>
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Attempts"
                        name="attempts_per_task_limit"
                        value={job.attempts_per_task_limit}
                        onChange={handleJobParametersChange}
                    />
                </Grid>
                <Grid item style={{paddingRight: 0, flexGrow: 1}}>
                    <TextField
                        fullWidth
                        label="Priority"
                        name="priority"
                    />
                </Grid>
                <Box>
                    <IconButton><AddIcon/></IconButton>
                </Box>
            </Grid>
        );
        plugin = (
            <React.Fragment>
                <Grid item xs={8} className={classes.flexItem}>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleOpenDialog}
                    >
                        Select Plugin
                    </Button>

                    <DialogPlugin
                        open={openDialog}
                        onClose={handleCloseDialog}
                        getPlugin={handleGetChosenPlugin}
                    />

                </Grid>
                <Grid item xs={2}>
                    <Select value="1.01" fullWidth>
                        <MenuItem value="1.01">
                            1.01
                        </MenuItem>
                    </Select>
                </Grid>
            </React.Fragment>
        );
        submitButton = (
            <React.Fragment>
                <Grid container xs={10} spacing={2} className={classes.flexItem}>
                    <Grid item xs={9}/>
                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            className={classes.submitButton}
                            onClick={() => handleSubmission()}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        submitInfo = (
            <React.Fragment>
                <Grid item xs={10}>
                    <TextField fullWidth label="Work title"/>
                </Grid>
                <Grid item xs={10}>
                    <TextField fullWidth label="Submitter"/>
                </Grid>
                <Grid item xs={10}>
                    <Select value="pathfinder monitor" fullWidth className={classes.selectMargin}>
                        <MenuItem value="pathfinder monitor">Pathfinder Monitor</MenuItem>
                        <MenuItem value="pathfinder core">Pathfinder Core</MenuItem>
                        <MenuItem value="pathfinder slave">Pathfinder Slave</MenuItem>
                    </Select>
                </Grid>
            </React.Fragment>
        );
        renderSettings = (
            <React.Fragment>
                <Grid item xs={5}>
                    <TextField fullWidth label="Frame start"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Frame end"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Step"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Start from"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Renum step"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Priority"/>
                </Grid>
                <Grid item xs={10}>
                    <Button variant="contained" fullWidth className={classes.buttonAdd}>ADD</Button>
                </Grid>
            </React.Fragment>
        );
        plugin = (
            <React.Fragment>
                <Grid item xs={10} className={classes.flexItem}>
                    {/*<Button fullWidth variant="contained" color="primary" onClick={handleOpenPopover}>*/}
                    {/*    {chosenPlugin ? chosenPlugin.name : "Choose Plugin"}*/}
                    {/*</Button>*/}
                    {/*<Popover*/}
                    {/*    open={open}*/}
                    {/*    anchorEl={anchorEl}*/}
                    {/*    onClose={handleClosePopover}*/}
                    {/*    anchorOrigin={{*/}
                    {/*        vertical: "bottom",*/}
                    {/*        horizontal: "left",*/}
                    {/*    }}*/}
                    {/*    transformOrigin={{*/}
                    {/*        vertical: "top",*/}
                    {/*        horizontal: "left",*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <List>*/}
                    {/*        {plugins.map((plugin) => {*/}
                    {/*            return (*/}
                    {/*                <ListItem*/}
                    {/*                    button*/}
                    {/*                    key={plugin.id}*/}
                    {/*                >*/}
                    {/*                    <Grid container spacing={2}>*/}
                    {/*                        <Grid item xs={4}>*/}
                    {/*                            {plugin.name}*/}
                    {/*                        </Grid>*/}
                    {/*                        <Grid item xs={8}>*/}
                    {/*                            {plugin.description}*/}
                    {/*                        </Grid>*/}
                    {/*                    </Grid>*/}
                    {/*                </ListItem>*/}
                    {/*            );*/}
                    {/*        })}*/}
                    {/*    </List>*/}
                    {/*</Popover>*/}
                </Grid>
                <Grid item xs={10}>
                    <Select value="1.01" fullWidth>
                        <MenuItem value="1.01">
                            1.01
                        </MenuItem>
                    </Select>
                </Grid>
            </React.Fragment>
        );
        submitButton = (
            <React.Fragment>
                <Grid item xs={10} className={classes.flexItem}>
                    <Button fullWidth variant="contained" className={classes.submitButton}>Submit</Button>
                </Grid>
            </React.Fragment>
        );
    }

    const field: IntegerField = new IntegerField({
        type: "integer",
        name: "samples",
        label: "Samples",
        min: 100,
        max: 120,
        default: 115
    });

    return (
        loaded ?
            <Box className={className} style={style}>
                <Grid container spacing={2} className={classes.container}>
                    <Grid item xs={10}>
                        <Typography variant="h6">Submit info</Typography>
                    </Grid>
                    {submitInfo}
                    <Grid item xs={10} className={classes.flexItem}>
                        <List disablePadding className={classes.fullWidth}>
                            <ListItem disableGutters>
                                <ListItemText
                                    primary={<Typography variant="h6">Render settings</Typography>}
                                />
                                {/*<ListItemSecondaryAction>*/}
                                {/*    <IconButton><AddIcon/></IconButton>*/}
                                {/*</ListItemSecondaryAction>*/}
                            </ListItem>
                        </List>
                    </Grid>
                    {renderSettings}

                    <Grid item xs={10} className={classes.flexItem}>
                        <Box>
                            <Chip
                                label="1000-1001 2 save as 10 Priority:1"
                                onDelete={handleDelete}
                                className={classes.chipStyle}
                            />
                            <Chip
                                label="1002-1279 1 save as 1 Priority:3"
                                onDelete={handleDelete}
                                className={classes.chipStyle}
                            />
                            <Chip
                                label="1279-1400 5 save as 1 Priority:2"
                                onDelete={handleDelete}
                                className={classes.chipStyle}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h6">Plugin</Typography>
                    </Grid>


                    {plugin}

                    <Grid item xs={10}>
                        {chosenPlugin &&
                        <PluginInput pluginId={chosenPlugin.id} setPluginSetting={setPluginSetting}/>
                        }
                    </Grid>


                    {submitButton}


                </Grid>

                {/*<Container maxWidth={"md"}>*/}
                {/*    <IntegerPluginField field={field}/>*/}
                {/*</Container>*/}
            </Box>
            :
            <Box className={classes.loading}>
                <Loading/>
            </Box>
    );
});

export default withStyles(styles)(SubmitPageView);