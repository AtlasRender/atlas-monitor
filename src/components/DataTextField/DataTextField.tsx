/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React from "react";
import {Box, Typography, useTheme, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import Containerable from "../../interfaces/Containerable";


/**
 * DataTextFieldProps - interface for DataTextField component
 * @interface
 * @author Andrii Demchyshyn
 */
interface DataTextFieldProps extends Stylable, Containerable {
    /**
     * label - small text of element
     * @type string
     */
    label?: string;
    /**
     * children - main text of element
     * @type string
     */
    children?: string | null;
}

/**
 * DataTextField - creates styled text component with label and main text
 * @function
 * @author Andrii Demchyshyn
 */
const DataTextField = React.forwardRef((props: DataTextFieldProps, ref: React.Ref<any>) => {
    const {
        classes,
        className,
        label,
        children,
    } = props;

    const theme = useTheme();

    return (
        <Box className={clsx(classes.boxContainer, className)}>
            <Typography className={clsx(classes.boxContainerTitle, className)}>
                {label}
            </Typography>
            <Typography className={clsx(classes.boxContainerText, className)}>
                {children}
            </Typography>
        </Box>
    );
});

export default withStyles(styles)(DataTextField);
