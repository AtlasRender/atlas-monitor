/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 22:12
 * All rights reserved.
 */

import React, {useContext, useRef} from "react";
import Stylable from "../../../../interfaces/Stylable";
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    withStyles,
} from "@material-ui/core";
import styles from "./styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {DropTargetMonitor, useDrag, useDrop, XYCoord} from "react-dnd";
import BasicPluginField from "../../../../entities/BasicPluginField";
import {PluginContext} from "../../CreatePluginPageView";
import {grey} from "@material-ui/core/colors";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckIcon from "@material-ui/icons/Check";
import Filter1Icon from "@material-ui/icons/Filter1";
import FolderIcon from "@material-ui/icons/Folder";

interface DragableListItemProps extends Stylable {
    field: BasicPluginField,

    onDelete(item: BasicPluginField): void,

    moveCard: (dragIndex: number, hoverIndex: number, targetId: number, toId: number) => void
    index: number,
    fieldIndex: number;
    error?: boolean;

    getIndex(index: number): void,
}

interface DragItem {
    index: number,
    id: string,
    type: string,
}

const DragableListItem: React.FC<DragableListItemProps> = ({
                                                               classes,
                                                               field,
                                                               onDelete,
                                                               moveCard,
                                                               index,
                                                               getIndex,
                                                               fieldIndex,
                                                               error
                                                           }) => {

    const context = useContext(PluginContext);

    const refer = useRef<HTMLDivElement>(null);
    const id = field.id;

    // console.log(field.id);

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
            const clientOffset = monitor.getClientOffset();
            const hoveredClientY = (clientOffset as XYCoord).y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoveredClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoveredClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex, 1, 1);

            // context.moveField(context.pluginFields, field.id, )

            item.index = hoverIndex;
        },

    });

    const [{isDragging}, drag] = useDrag({
        item: {type: "InputField", id, index},
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(refer));

    const opacity = isDragging ? 0 : 1;
    const backgroundColor = fieldIndex === index ? "#3D3D3D" : grey[800];
    let color = "white";
    if(error) {
        color = "red";
    }


    return (
        <ListItem
            ref={refer}
            style={{opacity, backgroundColor, color: color}}
            button
            onClick={() => getIndex(index)}
            className={classes.field}
        >
            <ListItemAvatar>
                <Avatar>
                    {field.type === "string" &&
                    <TextFieldsIcon/>
                    }
                    {field.type === "separator" &&
                    <RemoveIcon/>
                    }
                    {field.type === "boolean" &&
                    <CheckIcon/>
                    }
                    {(field.type === "integer" || field.type === "float") &&
                    <Filter1Icon/>
                    }
                    {field.type === "folder" &&
                    <FolderIcon/>
                    }
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={field.name}
                secondary={field.type}
            />
            <ListItemSecondaryAction style={{opacity}}>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(field)}
                >
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>

        </ListItem>
    );
};

export default withStyles(styles)(DragableListItem);