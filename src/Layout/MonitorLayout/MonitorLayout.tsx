/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 18:53
 * All rights reserved.
 */

import React, {Ref} from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import styles from "./styles";
import {Box, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import {Switch, BrowserRouter, Route} from "react-router-dom";
import RenderJobsView from "../../Views/RenderJobsView/RenderJobsView";
import clsx from "clsx";
import RenderJobsDetailsView from "../../Views/RenderJobsDetailsView";
import UserPageView from "../../Views/UserPageView";
import {useChangeRoute} from "routing-manager";

interface MonitorLayoutPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const MonitorLayout = React.forwardRef((props: MonitorLayoutPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const {changeRoute} = useChangeRoute();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    let drawer;
    if (matches) {
        drawer = (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Clipped drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar/>
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button onClick={() => changeRoute({page: "jobs", panel: null})}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Render Jobs"/>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem button onClick={() => changeRoute({page: "user", panel: null})}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="User Page"/>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Jobs"/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>
        );
    } else {
        drawer = (
            <React.Fragment>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Clipped drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }

    return (
        <Box className={classes.root}>

            {drawer}

            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    <Route exact path="/pages/jobs">
                        <RenderJobsView/>
                    </Route>
                    <Route path="/pages/jobs/jobDetails">
                        <RenderJobsDetailsView/>
                    </Route>
                    <Route path="/pages/user">
                        <UserPageView/>
                    </Route>
                </Switch>
            </main>

        </Box>
    );
});

export default withStyles(styles)(MonitorLayout);