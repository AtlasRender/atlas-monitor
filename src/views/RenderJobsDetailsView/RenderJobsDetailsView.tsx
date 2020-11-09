/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 17:14
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from 'react';
import {Box, Typography, Divider, withStyles, Grid, useMediaQuery, IconButton} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Progress from "../../components/Progress";
import Tabs from "../../components/Tabs";
import TabsPanel from "../../components/TabsPanel";
import {useTheme} from "@material-ui/core/styles";
import TasksTab from "./Tabs/TasksTab";
import InfoTable from "./Tabs/InfoTab";
import DataTextField from "../../components/DataTextField";
import StatisticsTab from "./Tabs/StatisticsTab";
import SimpleList from "../../components/SimpleList";
import Stylable from "../../interfaces/Stylable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {ChangeRouteProvider} from "routing-manager";
import Toolbar from "@material-ui/core/Toolbar";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import RenderJobsView from "../RenderJobsView/RenderJobsView";
import UserPageView from "../UserPageView/UserPageView";
import OrganizationPageView from "../OrganizationPageView/OrganizationPageView";
import SubmitPageView from "../SubmitPageView/SubmitPageView";
import ShortJobs from "../../entities/ShortJobs";
import useCoreRequest from "../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import RenderJob from "../../entities/RenderJob";

/**
 * RenderJobsDetailsViewProps - interface for RenderJobsDetailsView component
 * @interface
 * @author Andrii Demchyshyn
 */
interface RenderJobsDetailsViewProps extends Stylable {
}

/**
 * RenderJobsDetailsView - display page with render job details
 * @function
 * @author Andrii Demchyshyn
 */
const RenderJobsDetailsView = React.forwardRef((props: RenderJobsDetailsViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;


    const coreRequest = useCoreRequest();
    const theme = useTheme();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();


    const [value, setValue] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(false);
    const [tasks, setTasks] = useState();
    const [renderJob, setRenderJob] = useState<RenderJob>();

    useEffect(() => {

    }, []);


    function handleGetJob(job: ShortJobs, jobId: number) {
        coreRequest()
            .get(`jobs/${jobId}`)
            .then(response => {
                let entity: RenderJob = response.body;
                try{
                    entity = new RenderJob(response.body, job);
                } catch(err) {
                    enqueueErrorSnackbar("Invalid data types");
                }
                setRenderJob(entity);
                console.log(response.body);
            })
            .catch(err => {
                enqueueErrorSnackbar("Cant ger job");
            })
    }

    function handleGetTasks() {

    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const matches = useMediaQuery(theme.breakpoints.up('md'));
    let tasksTab;
    if (matches) {
        tasksTab = (<TasksTab/>);
    } else {
        tasksTab = (<SimpleList/>);
    }

    let {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <Box>
                    <Box className={classes.normalContent}>
                        <Typography variant="subtitle2" className={clsx(classes.pathText, className)}>
                            Renders Jobs / Pathfinder Logo
                        </Typography>
                        <Typography variant="h4" className={clsx(classes.mainText, className)}>
                            Pathfinder Logo
                        </Typography>
                        <Progress className={clsx(classes.progressMargin, className)}/>
                        <Typography variant="h6">
                            General
                        </Typography>
                        <Divider className={clsx(classes.dividerMargin, className)}/>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <DataTextField label="Name">
                                    Pathfinder Logo
                                </DataTextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DataTextField label="Submitter" children="Danil Andreev"/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DataTextField label="Organisation" children="Blizzard Entertainment"/>
                            </Grid>
                            <Grid item xs={6} sm={3} md={2}>
                                <DataTextField label="Priority" children="1"/>
                            </Grid>

                            <Grid item xs={6} sm={3} md={2}>
                                <DataTextField label="Status" children="Done"/>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <DataTextField label="Submission date" children="25.09.2020 12.59.20"/>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <DataTextField label="Finish date" children="29.09.2020 12.59.20"/>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <DataTextField label="Frames" children="400 - 800"/>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <DataTextField label="Competing tasks" children="2"/>
                            </Grid>

                            <Grid item xs={12}>
                                <DataTextField
                                    label="Description"
                                    children="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum sodales risus vitae
                                fermentum. Pellentesque hendrerit ultricies libero et lacinia. Integer sed ultricies velit.
                                Sed dui orci, lacinia fermentum lacus vitae, maximus pretium ante."
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={11}>
                                <Typography variant="h6" className={clsx(classes.pluginMargin, className)}>
                                    Plugin
                                </Typography>
                            </Grid>
                            <Grid item xs={1} className={clsx(classes.box, className)}>
                                <IconButton onClick={handleClick} className={clsx(classes.iconButton, className)}>
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider className={clsx(classes.dividerMargin, className)}/>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <DataTextField label="Name" children="Plug in Name"/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DataTextField label="Version" children="ver.1.22474487139..."/>
                            </Grid>
                            <Grid item xs={12}>
                                <DataTextField
                                    label="Description"
                                    children="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum sodales risus vitae
                                fermentum. Pellentesque hendrerit ultricies libero et lacinia. Integer sed ultricies velit.
                                Sed dui orci, lacinia fermentum lacus vitae, maximus pretium ante."
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        onChangeIndex={handleChangeIndex}
                        className={clsx(classes.customTabsMargin, className)}
                    >
                        <TabsPanel value={value} index={0} dir={theme.direction}>
                            {tasksTab}
                        </TabsPanel>
                        <TabsPanel value={value} index={1} dir={theme.direction}>
                            <InfoTable/>
                        </TabsPanel>
                        <TabsPanel value={value} index={2} dir={theme.direction}>
                            <StatisticsTab/>
                        </TabsPanel>
                    </Tabs>
                </Box>
            </Route>
        </Switch>
    );
});
RenderJobsDetailsView.displayName = "RenderJobsDetailsView";
RenderJobsDetailsView.propTypes = {}

export default withStyles(styles)(RenderJobsDetailsView);
