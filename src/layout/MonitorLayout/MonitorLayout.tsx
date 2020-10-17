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
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import styles from "./styles";
import {
    Avatar,
    Box,
    Divider,
    IconButton, Popper,
    SwipeableDrawer,
    useMediaQuery,
    useTheme,
    withStyles
} from "@material-ui/core";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import RenderJobsView from "../../views/RenderJobsView/RenderJobsView";
import RenderJobsDetailsView from "../../views/RenderJobsDetailsView";
import UserPageView from "../../views/UserPageView";
import OrganizationPageView from "../../views/OrganizationPageView";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from "clsx";
import {ChangeRouteProvider, useChangeRoute} from "routing-manager";
import Stylable from "../../interfaces/Stylable";
import SubmitPageView from "../../views/SubmitPageView";
import Button from "@material-ui/core/Button";
import useAuth from "../../hooks/useAuth";
import {func} from "prop-types";

/**
 * MonitorLayoutProps - interface for MonitorLayout component
 * @interface
 * @author Andrii Demchyshyn
 */
interface MonitorLayoutProps extends Stylable {

}

type Anchor = "left";

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
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({left: false});
    const {logout} = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const openPopper = Boolean(anchorEl);
    const id = openPopper ? 'simple-popper' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    function handleLogout() {
        logout();
        changeRoute({page: "authorization", panel: null});
    }

    const list = (anchor: Anchor) => (
        <Box
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
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
        </Box>
    );

    const matches = useMediaQuery(theme.breakpoints.up('md'));

    let drawer;
    if (matches) {
        state.left && setState({left: false});
        drawer = (
            <React.Fragment>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.typographyFlex}>
                            Pathfinder
                        </Typography>
                        <IconButton
                            aria-describedby={id}
                            type="button"
                            onClick={handleClick}
                        >
                            <Avatar />
                        </IconButton>
                        <Popper
                            id={id}
                            open={openPopper}
                            anchorEl={anchorEl}
                            className={classes.popperTop}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Popper>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <Box className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </Box>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => changeRoute({page: "jobs"})}>
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
                </Drawer>
            </React.Fragment>
        );
    } else {
        //
        open && setOpen(false);
        drawer = (
            <React.Fragment>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer("left", true)}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <SwipeableDrawer
                            anchor="left"
                            open={state["left"]}
                            onClose={toggleDrawer("left", false)}
                            onOpen={toggleDrawer("left", true)}
                        >
                            {list("left")}
                        </SwipeableDrawer>
                        <Typography variant="h6" noWrap>
                            Pathfinder
                        </Typography>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }

    let {path} = useRouteMatch();

    return (
        <Box className={classes.root}>

            {drawer}

            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    <Route path="/jobs">
                        <ChangeRouteProvider routeMask="(/:panel)">
                            <RenderJobsView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/user">
                        <ChangeRouteProvider routeMask="(/:id)">
                            <UserPageView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/organization">
                        <ChangeRouteProvider routeMask="(/:slave)">
                            <OrganizationPageView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/submit">
                        <ChangeRouteProvider routeMask="(/:panel)">
                            <SubmitPageView/>
                        </ChangeRouteProvider>
                    </Route>
                </Switch>
            </main>

        </Box>
    );
});

export default withStyles(styles)(MonitorLayout);