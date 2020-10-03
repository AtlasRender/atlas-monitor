/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 19:52
 * All rights reserved.
 */

import React, {Ref} from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import {Box, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import ListItemProgress from "../ListItemProgress";
import Stylable from "../../Interfaces/Stylable";
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

    return (
        <Box className={clsx(classes.root, className)}>
            <List component="nav" aria-label="secondary mailbox folders" className={classes.paddingNone}>
                <ListItemProgress progress="60%" button onClick={() => changeRoute({panel: "jobDetails"})}>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button onClick={() => changeRoute({panel: "jobDetails"})}>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button onClick={() => changeRoute({panel: "jobDetails"})}>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button onClick={() => changeRoute({panel: "jobDetails"})}>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button onClick={() => changeRoute({panel: "jobDetails"})}>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button onClick={() => changeRoute({panel: "jobDetails"})}>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
            </List>
        </Box>
    );
});

export default withStyles(styles)(SimpleList)