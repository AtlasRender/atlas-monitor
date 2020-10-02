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
import {Box, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import DataTextField from "../DataTextField";
import Progress from "../Progress";

interface SimpleListPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

const SimpleList =  React.forwardRef((props: SimpleListPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return (
        <Box className={clsx(classes.root, className)}>
            <List component="nav" aria-label="secondary mailbox folders" >
                <ListItem button>
                    <ListItemText primary={<React.Fragment><DataTextField label="Name" children="Pathfinder Logo"/><Progress/></React.Fragment>} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={<React.Fragment><DataTextField label="Name" children="Pathfinder Logo"/><Progress/></React.Fragment>} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={<React.Fragment><DataTextField label="Name" children="Pathfinder Logo"/><Progress/></React.Fragment>} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={<React.Fragment><DataTextField label="Name" children="Pathfinder Logo"/><Progress/></React.Fragment>} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={<React.Fragment><DataTextField label="Name" children="Pathfinder Logo"/><Progress/></React.Fragment>} />
                </ListItem>
            </List>
        </Box>
    );
});

export default withStyles(styles)(SimpleList)