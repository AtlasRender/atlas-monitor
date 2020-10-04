/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 22:22
 * All rights reserved.
 */

import React, {Ref} from 'react';
import {useTheme, withStyles} from '@material-ui/core/styles';
import styles from "./styles";
import {ListItem, ListItemProps} from "@material-ui/core";
import lightBlue from '@material-ui/core/colors/lightBlue';

/**
 * ListItemProgressProps - interface for List component
 * @interface
 * @author Andrii Demchyshyn
 */
interface ListItemProgressProps extends ListItemProps {
    progress: number;
}

/**
 * ListItemProgress - creates List item with progress bar
 * @function
 * @author Andrii Demchyshyn
 */
const ListItemProgress = React.forwardRef((props: any, ref: Ref<any>) => {
    const {
        classes,
        className,
        children,
        progress,
        ...other
    } = props;

    const theme = useTheme();

    return (
        <ListItem
            classes={classes}
            {...other}
            style={{background: `linear-gradient(90deg, ${lightBlue[200]} ${progress}%, ${theme.palette.common.white} 0%)`}}
            className={classes.itemListMargin}

        >
            {children}
        </ListItem>
    );
});

export default withStyles(styles)(ListItemProgress);
