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
import {makeStyles, Theme, useTheme, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from "./styles";
import clsx from "clsx";

interface CustomTabsPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
    children?: React.ReactNode;
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
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
    } = props;

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box className={clsx(classes.root, className)}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="TASKS" {...a11yProps(0)} />
                    <Tab label="INFO" {...a11yProps(1)} />
                    <Tab label="STATISTICS" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {children}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {children}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {children}
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
});

export default withStyles(styles)(CustomTabs);