/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 17:19
 * All rights reserved.
 */

import React, {Ref} from "react";
import {withStyles} from "@material-ui/core";
import {Avatar, Grid, Box, Typography, Divider} from "@material-ui/core";
import styles from "./styles";



interface OrganizationPageViewPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const OrganizationPageView = React.forwardRef((props: OrganizationPageViewPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return(
        <Box>

        </Box>
    );
})

export default withStyles(styles)(OrganizationPageView)