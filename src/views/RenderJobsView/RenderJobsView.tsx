/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {Box, Grid, IconButton, Typography, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import styles from "./styles";
import RenderJobsTable from "../../components/RenderJobsTable";
import SimpleList from "../../components/SimpleList";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import SearchIcon from "@material-ui/icons/Search";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import RenderJobsDetailsView from "../RenderJobsDetailsView";
import useCoreRequest from "../../hooks/useCoreRequest";
import {Jobs} from "../../interfaces/Jobs";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import useAuth from "../../hooks/useAuth";
import ErrorHandler from "../../utils/ErrorHandler";

/**
 * RenderJobsViewProps - interface for RenderJobsView component
 * @interface
 * @author Andrii Demchyshyn
 */
interface RenderJobsViewProps extends Stylable {

}

/**
 * RenderJobsView - display render jobs page
 * @function
 * @author Andrii Demchyshyn
 */
const RenderJobsView = React.forwardRef((props: RenderJobsViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;


    const {logout} = useAuth();
    const coreRequest = useCoreRequest();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();


    const [jobs, setJobs] = useState<Jobs[]>([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        Promise.all([
            handleGetJobs(),
        ]).then(() => {
            setLoaded(true);
        });
    }, []);


    async function handleGetJobs() {
        try {
            const response = await coreRequest().get("jobs");
            setJobs(response.body);
        } catch (err) {
            const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
            errorHandler
                .on(401, () => {logout()})
                .handle(err);
        }
    }


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let tableList;
    if (matches) {
        tableList = (<RenderJobsTable/>);
    } else {
        tableList = (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h5" className={clsx(classes.textMain)}>
                            Render Jobs
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={clsx(classes.box, className)}>
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <SimpleList/>
            </React.Fragment>
        );
    }

    let {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <Box>
                    {tableList}
                </Box>
            </Route>
            <Route exact path={`${path}/:jobId`}>
                <RenderJobsDetailsView/>
            </Route>
        </Switch>
    );
});
RenderJobsView.displayName = "RenderJobsView";
RenderJobsView.propTypes = {};

export default withStyles(styles)(RenderJobsView);
