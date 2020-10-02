/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 21:17
 * All rights reserved.
 */

import React, {Ref} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {withStyles} from '@material-ui/core/styles';
import clsx from "clsx";
import styles from "./styles";

interface ListPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

const List = React.forwardRef((props: ListPropsStyled, ref: Ref<any>) => {
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