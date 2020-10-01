/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 19:11
 * All rights reserved.
 */

import React from "react";
import {Box, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";

interface DataTextFieldPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
    label?: string;
    children?: string;
}

const DataTextField = React.forwardRef( (props: DataTextFieldPropsStyled) => {
    const {
        classes,
        className,
        label,
        children,
    } = props;


   return(
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

export default withStyles(styles)(DataTextField)