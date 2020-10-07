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
import {Route, Switch} from "react-router-dom";
import RenderJobsView from "../../views/RenderJobsView/RenderJobsView";
import RenderJobsDetailsView from "../../views/RenderJobsDetailsView";
import UserPageView from "../../views/UserPageView";
import OrganizationPageView from "../../views/OrganizationPageView";

import {useChangeRoute} from "routing-manager";
import Stylable from "../../interfaces/Stylable";
import SubmitPageView from "../../views/SubmitPageView";
import AuthorizationPageView from "../../views/AuthorizationPageView";
import SignUpPage from "../../views/SignUpPage";

/**
 * MonitorLayoutProps - interface for MonitorLayout component
 * @interface
 * @author Andrii Demchyshyn
 */
interface MonitorLayoutProps extends Stylable {

}

/**
 * MonitorLayout - creates main static part of page (header and leftside menu)
 * @function
 * @author Andrii Demchyshyn
 */
const MonitorLayout = React.forwardRef((props: MonitorLayoutProps, ref: Ref<any>) => {
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
                            <ListItem button onClick={() => changeRoute({page: "organization", panel: null})}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Organization Page"/>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem button onClick={() => changeRoute({page: "submit", panel: null})}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Submit Page"/>
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
                    <Route path="/pages/organization">
                        <OrganizationPageView/>
                    </Route>
                    <Route path="/pages/submit">
                        <SubmitPageView/>
                    </Route>
                    <Route path="/pages/Authorization">
                        <AuthorizationPageView/>
                    </Route>
                    <Route path="/pages/SignUp">
                        <SignUpPage/>
                    </Route>
                </Switch>
            </main>

        </Box>
    );
});

export default withStyles(styles)(MonitorLayout);