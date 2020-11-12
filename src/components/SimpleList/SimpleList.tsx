/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import {Box, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import ListItemProgress from "../ListItemProgress";
import Stylable from "../../interfaces/Stylable";
import {useChangeRoute} from "routing-manager";

/**
 * SimpleListProps - interface for RenderJobsTable component
 * @interface
 * @author Andrii Demchyshyn
 */
interface SimpleListProps extends Stylable {

}

/**
 * SimpleList - creates list with several components
 * @function
 * @author Andrii Demchyshyn
 */
const SimpleList = React.forwardRef((props: SimpleListProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const {changeRoute} = useChangeRoute();

    const jobs = [
        {id: 1, name: "Pathfinder Logo", submitter: "Danil Andreev", progress: 10},
        {id: 2, name: "Pathfinder Logo", submitter: "Andrii Demchyshyn", progress: 50},
        {id: 3, name: "Pathfinder Logo", submitter: "Danil Andreev", progress: 60},
        {id: 4, name: "Pathfinder Logo", submitter: "Danil Andreev", progress: 20},
        {id: 5, name: "Pathfinder Logo", submitter: "Danil Andreev", progress: 30},
        {id: 6, name: "Pathfinder Logo", submitter: "Danil Andreev", progress: 100},
    ];

    return (
        <Box className={clsx(classes.root, className)}>
            <List component="nav" aria-label="secondary mailbox folders" className={classes.paddingNone}>
                {jobs.map((job) =>
                    <ListItemProgress
                        key={`render-job-${job.id}`}
                        progress={job.progress}
                        button
                        onClick={() => changeRoute({panel: "jobDetails"})}
                    >
                        <ListItemText primary={job.name} secondary={job.submitter}/>
                    </ListItemProgress>
                )}
            </List>
        </Box>
    );
});

export default withStyles(styles)(SimpleList);
