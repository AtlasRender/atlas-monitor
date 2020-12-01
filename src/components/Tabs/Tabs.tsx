/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from "react";
import SwipeableViews from "react-swipeable-views";
import {useTheme, withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import styles from "./styles";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import Containerable from "../../interfaces/Containerable";

/**
 * CustomTabsProps - interface for RenderJobsTable component
 * @interface
 * @author Andrii Demchyshyn
 */
interface CustomTabsProps extends Stylable, Containerable {
    value?: number,
    onChange?: any,
    onChangeIndex?: any,

}

/**
 * a11yProps -
 * @param index
 * @function
 * @author Andrii Demchyshyn
 */
function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

/**
 * CustomTabs - creates field for tabs panels
 * @function
 * @author Andrii Demchyshyn
 */
const CustomTabs = React.forwardRef((props: CustomTabsProps, ref: Ref<any>) => {
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
            <Toolbar className={classes.paddingToolbar}>
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
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={onChangeIndex}
            >
                {children}
            </SwipeableViews>
        </Box>
    );
});

export default withStyles(styles)(CustomTabs);
