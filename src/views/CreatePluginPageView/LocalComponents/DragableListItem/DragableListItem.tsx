/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 22:12
 * All rights reserved.
 */

import React, {Ref, useRef} from "react";
import Stylable from "../../../../interfaces/Stylable";
import {
    Avatar, Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText, Typography,
    withStyles,
} from "@material-ui/core";
import styles from "./styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {DropTargetMonitor, useDrag, useDrop, XYCoord} from "react-dnd";
import BasicPluginField from "../../../../entities/BasicPluginField";
import GroupField from "../../../../entities/GroupField";
import IntegerField from "../../../../entities/IntegerField";
import Folder from "../DragableComponents/Folder";

interface DragableListItemProps extends Stylable{
    field: BasicPluginField,
    onDelete(item: BasicPluginField): void,
    moveCard: (dragIndex: number, hoverIndex: number) => void
    index: number,
}

interface DragItem{
    index: number,
    id: string,
    type: string,
}

const DragableListItem : React.FC<DragableListItemProps> = ({ field, onDelete, moveCard, index}) => {

    const refer = useRef<HTMLLIElement>(null);
    const id = field.id;


    const [, drop] = useDrop({
        accept: "InputField",
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!refer.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoveredRect = refer.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            // const mousePosition = monitor.getClientOffset();
            // const hoveredClientY = mousePosition && mousePosition.y - hoveredRect.top;
            const clientOffset = monitor.getClientOffset()
            const hoveredClientY = (clientOffset as XYCoord).y - hoveredRect.top

            if (dragIndex < hoverIndex && hoveredClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoveredClientY > hoverMiddleY) {
                return;
            }


            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },

    })

    const [{isDragging}, drag] = useDrag({
        item: {type: "InputField", id, index},
        collect: (monitor:any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(refer));

    const opacity = isDragging ? 0 : 1;

    return(
        field.type !== "folder" ?
            <ListItem ref={refer} style={{opacity}}>
                <ListItemAvatar>
                    <Avatar/>
                </ListItemAvatar>
                <ListItemText
                    primary={field.label}
                    // secondary={field.label}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(field)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>

            </ListItem>
            :
            <Folder />
    );
};

export default withStyles(styles)(DragableListItem);