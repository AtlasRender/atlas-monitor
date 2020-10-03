/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 17:14
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Box,} from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";
import Stylable from "../../Interfaces/Stylable";
import Containerable from "../../Interfaces/Containerable";

/**
 * CustomTabsPanelProps - interface for TabsPanel component
 * @interface
 * @author Andrii Demchyshyn
 */
interface CustomTabsPanelProps extends Stylable, Containerable{
    dir?: string;
    index: any;
    value: any;
}

/**
 * TabsPanel - creates one tab panel
 * @function
 * @author Andrii Demchyshyn
 */
const TabsPanel = React.forwardRef((props: CustomTabsPanelProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <Box
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
        </Box>
    );
});

export default withStyles(styles)(TabsPanel)