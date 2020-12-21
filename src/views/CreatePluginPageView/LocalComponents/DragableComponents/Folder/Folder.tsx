/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 18:14
 * All rights reserved.
 */

import React, {useContext} from "react";
import {withStyles} from "@material-ui/core";
import Stylable from "../../../../../interfaces/Stylable";
import styles from "./styles";
import {useDrop} from "react-dnd";
import {grey} from "@material-ui/core/colors";
import {PluginContext} from "../../../CreatePluginPageView";
import GroupField from "../../../../../entities/GroupField";
import IntegerField from "../../../../../entities/IntegerField";
import SeparatorField from "../../../../../entities/SeparatorField";
import StringField from "../../../../../entities/StringField";
import BooleanField from "../../../../../entities/BooleanField";
import FloatField from "../../../../../entities/FloatField";

interface FolderProps extends Stylable {
    id: number,
}

const Folder: React.FC<FolderProps> = ({classes, className, children, id, style}) => {

    const context = useContext(PluginContext);

    const [{isOver, isOverCurrent}, drop] = useDrop({
        accept: ["integer", "folder", "separator", "string", "boolean", "float"],
        drop(item, monitor) {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }
            // if(isOverCurrent) {
            //
            // }
            if (item.type === "folder") {
                context.handleAddPluginField(new GroupField({
                    type: "folder",
                    name: "Folder",
                    label: "Folder",
                    nested: [],
                    id: context.idGenerator(),
                }), id);
            } else if (item.type === "integer") {
                context.handleAddPluginField(new IntegerField({
                    type: "integer",
                    name: "Integer",
                    label: "Integer Field",
                    min: null,
                    max: null,
                    default: null,
                    id: context.idGenerator(),
                }), id);
            } else if (item.type === "separator") {
                context.handleAddPluginField(new SeparatorField({
                    type: "separator",
                    name: "Divider",
                    label: "Divider",
                    id: context.idGenerator(),
                }), id);
            } else if (item.type === "string") {
                context.handleAddPluginField(new StringField({
                    type: "string",
                    name: "String",
                    label: "String Field",
                    min: null,
                    max: null,
                    default: "",
                    id: context.idGenerator(),
                }), id);
            } else if(item.type === "boolean") {
                context.handleAddPluginField(new BooleanField({
                    type: "boolean",
                    name: "Boolean",
                    label: "Boolean Field",
                    default: false,
                    id: context.idGenerator(),
                }), id);
            } else if (item.type === "float") {
                context.handleAddPluginField(new FloatField({
                    type: "float",
                    name: "Float",
                    label: "Float Field",
                    min: null,
                    max: null,
                    default: null,
                    id: context.idGenerator(),
                }), id);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({shallow: true}),
        }),
    });

    return (
        <div className={className ? className : classes.folder} ref={drop}
             style={isOverCurrent ? {backgroundColor: grey[900]} : {backgroundColor: grey[800]}}>
            <div>{children}</div>
        </div>
    );
};

export default withStyles(styles)(Folder);