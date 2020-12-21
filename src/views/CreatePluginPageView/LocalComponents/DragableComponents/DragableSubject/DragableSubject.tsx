/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 17:29
 * All rights reserved.
 */

import React from "react";
import {useDrag} from "react-dnd";
import {Avatar, ListItem, ListItemAvatar, ListItemText, withStyles} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../../../../interfaces/Stylable";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import Filter1Icon from '@material-ui/icons/Filter1';
import FolderIcon from '@material-ui/icons/Folder';

interface DragableSubjectProps extends Stylable {
    type: string;
}

const DragableSubject: React.FC<DragableSubjectProps> = ({classes, className, style, type}) => {

    const [{isDragging}, drag] = useDrag({
        item: {type: type},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const opacity = isDragging ? 0.6 : 1;

    return (
        <ListItem ref={drag} className={classes.container} style={{opacity}}>
            <ListItemAvatar>
                <Avatar>
                    {type === "string" &&
                    <TextFieldsIcon/>
                    }
                    {type === "separator" &&
                    <RemoveIcon/>
                    }
                    {type === "boolean" &&
                    <CheckIcon/>
                    }
                    {(type === "integer" || type === "float") &&
                    <Filter1Icon/>
                    }
                    {type === "folder" &&
                    <FolderIcon/>
                    }
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={type}/>
        </ListItem>
    );
};

export default withStyles(styles)(DragableSubject);