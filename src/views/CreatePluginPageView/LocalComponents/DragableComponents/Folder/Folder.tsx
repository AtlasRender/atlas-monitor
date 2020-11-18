/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 18:14
 * All rights reserved.
 */

import React from "react"
import {Box, withStyles} from "@material-ui/core";
import Stylable from "../../../../../interfaces/Stylable";
import styles from "./styles";
import {useDrop} from "react-dnd";
import {grey} from "@material-ui/core/colors";

interface FolderProps extends Stylable{

}


const Folder: React.FC<FolderProps> = ({classes, className, children, style}) =>{

    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: "box",
        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return;
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),

    })

    return(
        <div className={className ? className : classes.folder} ref={drop} style={isOverCurrent ? {backgroundColor:grey[900]} : {backgroundColor:"transparent"} }>
            <div>{children}</div>
        </div>
    );
}

export default withStyles(styles) (Folder);