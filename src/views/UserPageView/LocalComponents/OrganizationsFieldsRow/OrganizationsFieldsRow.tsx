/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 21:23
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Grid, useMediaQuery, withStyles, useTheme} from "@material-ui/core";

import styles from "./styles"
import clsx from "clsx";
import DataTextField from "../../../../components/DataTextField";
import Stylable from "../../../../interfaces/Stylable";

/**
 * OrganizationsFieldsRowPropsStyled - interface for OrganizationsFieldsRow function in component
 * @interface
 * @author Nikita Nesterov
 */
interface OrganizationsFieldsRowPropsStyled extends Stylable {
    organization?: string,
    role?: string,
    status?: string,
}

/**
 * OrganizationsFieldsRow - function that returns a row of organizations info for user in UserPageView
 * @function
 * @author Nikita Nesterov
 */
const OrganizationsFieldsRow = React.forwardRef((props: OrganizationsFieldsRowPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
        organization,
        role,
        status
    } = props;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let Row;

    if(matches){
        Row = (
            <Grid container spacing={1} className={classes.container}>
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
        )
    }else{
        Row=(
            <Grid container spacing={1} className={clsx(classes.container,classes.margins)}>
                <Grid item xs={10}>
                    <DataTextField label="Organization" children={organization}/>
                </Grid>
                <Grid item xs={5}>
                    <DataTextField label="Role" children={role}/>
                </Grid>
                <Grid item xs={5}>
                    <DataTextField label="Status" children={status}/>
                </Grid>
            </Grid>
        );
    }

    return (
        <React.Fragment>
            {Row}
        </React.Fragment>
    );
});

export default withStyles(styles)(OrganizationsFieldsRow);
