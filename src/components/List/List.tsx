/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {withStyles} from '@material-ui/core/styles';
import clsx from "clsx";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";

/**
 * ListProps - interface for List component
 * @interface
 * @author Andrii Demchyshyn
 */
interface ListProps extends Stylable {

}

/**
 * renderRow - returns list item with component
 * @function
 * @param props
 * @author Andrii Demchyshyn
 */
function renderRow(props: ListChildComponentProps) {
    const {index, style} = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`}/>
        </ListItem>
    );
}

/**
 * List - creates List component with fixed size for large amount of components
 * @function
 * @author Andrii Demchyshyn
 */
const List = React.forwardRef((props: ListProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return (
        <Box className={clsx(classes.root, className)}>
            <FixedSizeList height={400} width={800} itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList>
        </Box>
    );
});

export default withStyles(styles)(List);
