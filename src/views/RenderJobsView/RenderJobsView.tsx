/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 17:13
 * All rights reserved.
 */

import React, {Ref} from 'react';
import {Box, Grid, IconButton, Typography, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import styles from "./styles";
import RenderJobsTable from "../../components/RenderJobsTable";
import SimpleList from "../../components/SimpleList";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import SearchIcon from '@material-ui/icons/Search';

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

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
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

    return (
        <Box>
            {tableList}
        </Box>
    );
});
RenderJobsView.displayName = "RenderJobsView";
RenderJobsView.propTypes = {}

export default withStyles(styles)(RenderJobsView);
