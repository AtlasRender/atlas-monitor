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
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Box, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import DataTextField from "../DataTextField";
import Progress from "../Progress";
import ListItemProgress from "../ListItemProgress";

interface SimpleListPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const SimpleList =  React.forwardRef((props: SimpleListPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return (
        <Box className={clsx(classes.root, className)}>
            <List component="nav" aria-label="secondary mailbox folders" className={classes.paddingNone}>
                <ListItemProgress progress="60%" button>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
                <ListItemProgress progress="60%" button>
                    <ListItemText primary="Pathfinder Logo" secondary="Danil Andreev"/>
                </ListItemProgress>
            </List>
        </Box>
    );
});

export default withStyles(styles)(SimpleList)