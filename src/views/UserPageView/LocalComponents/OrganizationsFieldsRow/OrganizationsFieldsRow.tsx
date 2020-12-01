/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Grid, useMediaQuery, useTheme, withStyles} from "@material-ui/core";

import styles from "./styles";
import clsx from "clsx";
import DataTextField from "../../../../components/DataTextField";
import Stylable from "../../../../interfaces/Stylable";

/**
 * OrganizationsFieldsRowPropsStyled - interface for OrganizationsFieldsRow function in component
 * @interface
 * @author Nikita Nesterov
 */
interface OrganizationsFieldsRowProps extends Stylable {
    organization?: string,
    role?: string,
    status?: string,
}

/**
 * OrganizationsFieldsRow - function that returns a row of organizations info for user in UserPageView
 * @function
 * @author Nikita Nesterov
 */
const OrganizationsFieldsRow = React.forwardRef((props: OrganizationsFieldsRowProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        organization,
        style,
        role,
        status
    } = props;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let row;

    if (matches) {
        row = (
            <Grid container spacing={1} className={clsx(classes.container, className)} style={style}>
                <Grid item xs={6}>
                    <DataTextField label="Organization" children={organization}/>
                </Grid>
                <Grid item xs={2}>
                    <DataTextField label="Role" children={role}/>
                </Grid>
                <Grid item xs={2}>
                    <DataTextField label="Status" children={status}/>
                </Grid>
            </Grid>
        );
    } else {
        row = (
            <Grid container spacing={1} className={clsx(classes.container, classes.margins, className)} style={style}>
                <Grid item xs={12} md={10}>
                    <DataTextField label="Organization" children={organization}/>
                </Grid>
                <Grid item xs={6}>
                    <DataTextField label="Role" children={role}/>
                </Grid>
                <Grid item xs={6}>
                    <DataTextField label="Status" children={status}/>
                </Grid>
            </Grid>
        );
    }

    return row;
});

export default withStyles(styles)(OrganizationsFieldsRow);
