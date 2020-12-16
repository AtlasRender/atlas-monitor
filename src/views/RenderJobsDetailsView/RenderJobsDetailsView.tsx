/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {Box, Chip, Divider, Grid, IconButton, Typography, useMediaQuery, withStyles} from "@material-ui/core";
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
import {useChangeRoute} from "routing-manager";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ShortJobs from "../../entities/ShortJobs";
import useCoreRequest from "../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import RenderJob from "../../entities/RenderJob";
import Loading from "../../components/Loading";
import {format} from "date-fns";
import CoreEventDispatcher from "../../core/CoreEventDispatcher";
import {WS_RENDER_JOB_UPDATE} from "../../globals";
import useAuth from "../../hooks/useAuth";
import ErrorHandler from "../../utils/ErrorHandler";

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


    const {logout} = useAuth();
    const coreRequest = useCoreRequest();
    const theme = useTheme();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const {getRouteParams} = useChangeRoute();
    const {panel} = getRouteParams();


    const [value, setValue] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(false);
    const [tasks, setTasks] = useState();
    const [renderJob, setRenderJob] = useState<RenderJob>();
    const [loaded, setLoaded] = useState(false);

    // console.log("renderJob:", renderJob);

    useEffect(() => {

        CoreEventDispatcher.getInstance().addListener(WS_RENDER_JOB_UPDATE, updateListener);

        Promise.all([
            handleGetJob(),
            handleGetTasks(),
        ]).then(() => {
            setLoaded(true);
        });

        return () => {
            CoreEventDispatcher.getInstance().removeListener(WS_RENDER_JOB_UPDATE, updateListener);
        }

    }, []);


    function updateListener(message: any) {
        console.log("Update Job Listener");
        coreRequest()
            .get("jobs")
            .query({id: message.id})
            .then(res => {
                if(+panel === message.id) {
                    setRenderJob(new ShortJobs(res.body));
                }
            });
    }

    async function handleGetJob() {
        try {
            const response = await coreRequest().get(`jobs/${panel}`);
            console.log(response.body);
            let entity: RenderJob = response.body;
            try {
                entity = new ShortJobs(response.body);
            } catch (err) {
                enqueueErrorSnackbar("Invalid data types");
            }

            setRenderJob(entity);
        } catch (err) {
            const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
            errorHandler
                .on(401, () => {logout()})
                .on(403, "You don't have permissions to this data")
                .on(404, "Render job not found")
                .handle(err);
        }
    }

    async function handleGetTasks() {
        try {
            const response = await coreRequest().get(`jobs/${panel}/tasks`);
            setTasks(response.body);
        } catch (err) {
            const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
            errorHandler
                .on(401, () => {logout()})
                .on(403, "You don't have permissions to this data")
                .on(404, "Render job not found")
                .handle(err);
        }
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let tasksTab;
    if (matches) {
        tasksTab = (<TasksTab/>);
    } else {
        tasksTab = (<SimpleList/>);
    }

    let {path} = useRouteMatch();

    return (
        loaded ?
            <Switch>
                <Route exact path={path}>
                    <Box>
                        <Box className={classes.normalContent}>
                            <Typography variant="subtitle2" className={clsx(classes.pathText, className)}>
                                Renders Jobs / {renderJob?.name}
                            </Typography>
                            <Typography variant="h4" className={clsx(classes.mainText, className)}>
                                {renderJob?.name}
                            </Typography>

                            <Progress progress={
                                renderJob ? (((renderJob?.doneTasks) / (renderJob?.doneTasks + renderJob?.pendingTasks + renderJob?.failedTasks + renderJob?.processingTasks)) * 100) : 10
                            } className={clsx(classes.progressMargin, className)}/>

                            <Typography variant="h6">
                                General
                            </Typography>
                            <Divider className={clsx(classes.dividerMargin, className)}/>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DataTextField label="Name">
                                        {renderJob?.name}
                                    </DataTextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DataTextField label="Submitter" children="Danil Andreev"/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DataTextField label="Organisation">
                                        {renderJob?.organization.name}
                                    </DataTextField>
                                </Grid>
                                <Grid item xs={6} sm={3} md={2}>
                                    <DataTextField label="Priority" children="1"/>
                                </Grid>

                                <Grid item xs={6} sm={3} md={2}>
                                    <DataTextField label="Status" children="Done"/>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <DataTextField label="Submission date">
                                        {renderJob && format(renderJob.createdAt, "dd.MM.yyyy hh:mm")}
                                    </DataTextField>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <DataTextField label="Finish date">
                                        {renderJob && format(renderJob.updatedAt, "dd.MM.yyyy hh:mm")}
                                    </DataTextField>

                                </Grid>
                                {renderJob &&
                                <Grid item xs={6} md={4}>
                                    {renderJob?.frameRange.map((frame: any, index: number) => {
                                        return (
                                            <Chip
                                                key={index}
                                                label={`Frames: ${frame.start} - ${frame.end}`}
                                                style={{minWidth: 125}}
                                            />
                                        );
                                    })}
                                </Grid>
                                }

                                <Grid item xs={12}>
                                    <DataTextField
                                        label="Description"
                                    >
                                        {renderJob?.description}
                                    </DataTextField>
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
            :
            <Box className={classes.loading}>
                <Loading/>
            </Box>
    );
});
RenderJobsDetailsView.displayName = "RenderJobsDetailsView";
RenderJobsDetailsView.propTypes = {};

export default withStyles(styles)(RenderJobsDetailsView);
