/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 22:50
 * All rights reserved.
 */

import React, {Ref} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {useTheme, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import styles from "./styles";
import clsx from "clsx";

interface CustomTabsPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
    children?: React.ReactNode;
    value?: any,
    onChange?: any,
    onChangeIndex?: any,
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const CustomTabs = React.forwardRef((props: CustomTabsPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
        children,
        onChange,
        value,
        onChangeIndex
    } = props;

    const theme = useTheme();

    return (
        <Box className={clsx(classes.root, className)}>
            <Toolbar>
                <Tabs
                    className={clsx(classes.fullWidth, className)}
                    value={value}
                    onChange={onChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="TASKS" {...a11yProps(0)} />
                    <Tab label="INFO" {...a11yProps(1)} />
                    <Tab label="STATISTICS" {...a11yProps(2)} />
                </Tabs>
            </Toolbar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={onChangeIndex}
            >
                {children}
            </SwipeableViews>
        </Box>
    );
});

export default withStyles(styles)(CustomTabs);