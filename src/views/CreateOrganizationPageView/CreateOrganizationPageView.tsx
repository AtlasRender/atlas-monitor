/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 18.10.2020, 21:30
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Grid,
    withStyles,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction, Typography,
    Divider, ListItemIcon, ListItemAvatar,
    Select, useMediaQuery, useTheme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BuildIcon from "@material-ui/icons/Build";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";


interface CreateOrganizationPageProps extends Stylable {

}

const CreateOrganizationPageView = React.forwardRef((props: CreateOrganizationPageProps, ref: Ref<any>) => {
    const {
        style,
        className,
        classes,
    } = props;

    const [plugins, setPlugins] = useState(["Pathfinder", "Atlas", "Firefly"]);
    const [members, setMembers] = useState(["Nikita", "Andrey"]);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let info;
    if(matches){
        info=(
            <React.Fragment>
                <Grid item xs={6}>
                    <TextField margin="normal" required fullWidth label="Organization name"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField margin="normal" fullWidth label="Description"/>
                </Grid>
            </React.Fragment>
        );
    }else{
        info=(
            <React.Fragment>
                <Grid item xs={12}>
                    <TextField margin="normal" required fullWidth label="Organization name"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField margin="normal" fullWidth label="Description"/>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <Grid container spacing={2} style={style} className={clsx(classes.container, classes.sidePaddings, className)}>
            <Grid container justify="center" direction="row" alignItems="center">
                <IconButton><Avatar variant="circle" src="/broken-image.jpg" className={classes.avatar}/></IconButton>
            </Grid>
            {info}
            <Grid item xs={12} spacing={2}>
                <List>
                    <ListItem className={clsx(classes.sidePaddingsNone, classes.listHeader)}>
                        <ListItemText primary={<Typography variant="h6">Slaves</Typography>}/>
                        <IconButton><AddIcon/></IconButton>
                    </ListItem>
                    <Divider className={classes.divider}/>
                    {plugins.map(item => {
                        return (
                            <ListItem>
                                <ListItemIcon><BuildIcon/></ListItemIcon>
                                <ListItemText primary={item}/>
                                <ListItemSecondaryAction>
                                    <IconButton><CloseIcon/></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
                <List style={{marginTop: 16}}>
                    <ListItem className={clsx(classes.sidePaddingsNone, classes.listHeader)}>
                        <ListItemText primary={<Typography variant="h6">Members</Typography>}/>
                        <IconButton><AddIcon/></IconButton>
                    </ListItem>
                    <Divider className={classes.divider}/>
                    {members.map(person => {
                        return (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar/>
                                </ListItemAvatar>
                                <ListItemText primary={person}/>
                                <ListItemSecondaryAction>
                                    <Select></Select>
                                    <IconButton><CloseIcon/></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
});

export default withStyles(styles)(CreateOrganizationPageView);