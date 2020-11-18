/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 17:29
 * All rights reserved.
 */

import React from 'react'
import { useDrag } from 'react-dnd'
import {Avatar, ListItem, ListItemAvatar, ListItemText, withStyles} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../../../../interfaces/Stylable";

interface DragableSubjectProps extends Stylable{
    type: string;
}

const DragableSubject: React.FC<DragableSubjectProps> = ({classes, className, style, type}) => {

    const [, drag] = useDrag({ item: { type: type }})

    return (
        <ListItem ref={drag} className={classes.container}>
            <ListItemAvatar>
                <Avatar/>
            </ListItemAvatar>
            <ListItemText primary={type}/>
        </ListItem>
    )
}

export default withStyles(styles)(DragableSubject);