/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 04.10.2020, 16:10
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
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
import Loading from "../../components/Loading/Loading";

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
    } = props

    const enqueueSuccessSnackbar = useEnqueueSuccessSnackbar();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const {getUser} = useAuth();
    const coreRequest = useCoreRequest();

    const [userData, setUserData] = useState<UserData>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [org, setOrg] = useState<string>();
    const [frameRange, setFrameRange] = useState<FrameRange>();
    const [job, setJob] = useState({
        name: "",
        user: "",
        description: "smth",
        organization: null,
        frameRange: "2-10 11-100",
        attempts_per_task_limit:1,
    })
    useEffect(() => {
        Promise.all([
            handleGetUser(),
            userData && handleOrgChange(userData?.organizations[0]),
        ]).then(()=>{setLoaded(true)})
    }, []);

    useEffect(() => {
        if (userData) {
            setJob((prev) => ({...prev, user: userData.username}));
        }
    }, [userData]);

    /**
     * handleGetUser - function for taking info about authorized user
     * @function
     * @author Nikita Nesterov
     */
    function handleGetUser() {
        const id = getUser()?.id;
        coreRequest()
            .get(`users/${id}`)
            .then((response) => {
                setUserData(response.body);
            })
            .catch(err => {
                //TODO handle errors
                // enqueueErrorSnackbar("No such user");
            });
    }

    function handleOrgChange(item: any) {
        setOrg(item.name);
        setJob((prev) => ({...prev, organization: item.id}));
    }

    /**
     * handleInput - used for writing info from TextFields to job state
     * @function
     * @author Nikita Nesterov
     */
    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setJob(prev => ({...prev, [event.target.name]: event.target.value}));
        console.log(job);
    }

    function handleSubmission() {
        coreRequest()
            .post("jobs")
            .send(job)
            .then(()=>{
                enqueueSuccessSnackbar("successfully submitted")
            })
            .catch(()=>{
               enqueueErrorSnackbar("Something went wrong");
            })
    }

    const handleDelete = () => {
        console.info("You clicked the delete icon.");
    };

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
                        label="Submitter"
                        name="user"
                        value={job.user}
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
                        {userData?.organizations.map((item) => {
                            return (
                                <MenuItem
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
                    <TextField fullWidth label="Frame start"/>
                </Grid>
                <Grid item>
                    <TextField fullWidth label="Frame end"/>
                </Grid>
                <Grid item>
                    <TextField fullWidth label="Step"/>
                </Grid>
                <Grid item>
                    <TextField fullWidth label="Start from"/>
                </Grid>
                <Grid item>
                    <TextField fullWidth label="Renum step"/>
                </Grid>
                <Grid item>
                    <TextField fullWidth label="Attempts"/>
                </Grid>
                <Grid item style={{paddingRight: 0, flexGrow: 1}}>
                    <TextField fullWidth label="Priority"/>
                </Grid>
                <Box>
                    <IconButton><AddIcon/></IconButton>
                </Box>
            </Grid>
        );
        plugin = (
            <React.Fragment>
                <Grid item xs={8} className={classes.flexItem}>
                    <Select value={1} fullWidth>
                        <MenuItem value={1}>
                            Arnold Shwarznegger and Silvestr s talonom
                        </MenuItem>
                    </Select>
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
                            onClick={()=>handleSubmission()}
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
                    <Select value={1} fullWidth>
                        <MenuItem value={1}>
                            Arnold Shwarznegger and Silvestr s talonom
                        </MenuItem>
                    </Select>
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
        )
    }

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
                        {submitButton}
                    </Grid>
                </Box>
                :
                <Box className={classes.loading}>
                    <Loading/>
                </Box>
    );
});

export default withStyles(styles)(SubmitPageView);