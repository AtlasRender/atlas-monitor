/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React, {Ref, useEffect} from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import styles from "./styles";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Popover,
    SwipeableDrawer,
    useMediaQuery,
    useTheme,
    withStyles
} from "@material-ui/core";
import {Route, Switch, useLocation, useRouteMatch} from "react-router-dom";
import RenderJobsView from "../../views/RenderJobsView/RenderJobsView";
import UserPageView from "../../views/UserPageView";
import OrganizationPageView from "../../views/OrganizationPageView";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import {ChangeRouteProvider, useChangeRoute} from "routing-manager";
import Stylable from "../../interfaces/Stylable";
import SubmitPageView from "../../views/SubmitPageView";
import Button from "@material-ui/core/Button";
import useAuth from "../../hooks/useAuth";
import CreateOrganizationPageView from "../../views/CreateOrganizationPageView";
import UserEditView from "../../views/UserEditView/UserEditView";
import AtlasLogo from "./images/AtlasSystemsLogo.svg";
import CreatePluginPageView from "../../views/CreatePluginPageView";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import CoreEventDispatcher from "../../core/CoreEventDispatcher";
import User from "../../entities/User";
import {WS_RENDER_JOB_UPDATE} from "../../globals";
import MenuElement from "../../components/MenuElement";
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import WorkIcon from '@material-ui/icons/Work';
import CheckIcon from '@material-ui/icons/Check';
import GroupIcon from '@material-ui/icons/Group';

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
const MonitorLayout = React.forwardRef((props: MonitorLayoutProps, ref: Ref<HTMLElement>): JSX.Element => {
    const {
        classes,
        className,
    } = props;

    const {changeRoute} = useChangeRoute();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({left: false});
    const {logout, isLogged, getUser} = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const openPopper = Boolean(anchorEl);
    const id = openPopper ? "simple-popper" : undefined;
    const location = useLocation();

    useEffect(() => {
        const user: User | null = getUser();
        if (user)
            CoreEventDispatcher.connect(user.bearer);

        const listener = (message: any) => {
            console.log("recieved11 ", message);
        };
        CoreEventDispatcher.getInstance().addListener(WS_RENDER_JOB_UPDATE, listener);

        if (location.pathname === "/") {
            changeRoute({page: "user", id: null});
        }

        return () => {
            //CoreEventDispatcher.disconnect()
            CoreEventDispatcher.getInstance().removeListener("ping", listener);
        };
    }, []);

    useEffect(() => {
        if (!isLogged) {
            changeRoute({page: `authorization`, panel: null});
        }
    }, [isLogged]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
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
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "DialogTaskTabs" ||
                (event as React.KeyboardEvent).key === "Shift")
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
                <MenuElement icon={WorkIcon} page="jobs" label="Render ShortJobs"/>
                <MenuElement icon={PersonIcon} page="user" label="User Page"/>
                <MenuElement icon={GroupIcon} page="organization/1" label="Organization Page"/>
                <MenuElement icon={CheckIcon} page="submit" label="Submit Page"/>
                <MenuElement icon={AddIcon} page="createorganization" label="Create Organization"/>
            </List>
        </Box>
    );

    const matches = useMediaQuery(theme.breakpoints.up("md"));

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
                    }, classes.header)}
                >
                    <Toolbar className={classes.header}>
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
                        <Avatar src={AtlasLogo} variant="square"/>
                        <Typography variant="h6" noWrap className={classes.typographyFlex}>
                            Atlas
                        </Typography>
                        <IconButton
                            aria-describedby={id}
                            type="button"
                            onClick={handleClick}
                        >
                            <Avatar/>
                        </IconButton>
                        <Popover
                            id={id}
                            open={openPopper}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            className={classes.popperTop}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Popover>
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
                            {theme.direction === "rtl" ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </Box>
                    <Divider/>
                    <List>
                        <MenuElement icon={WorkIcon} page="jobs" label="Render ShortJobs"/>
                        <MenuElement icon={PersonIcon} page="user" label="User Page"/>
                        <MenuElement icon={GroupIcon} page="organization/1" label="Organization Page"/>
                        <MenuElement icon={CheckIcon} page="submit" label="Submit Page"/>
                        <MenuElement icon={AddIcon} page="createorganization" label="Create Organization"/>
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
                    <Toolbar className={classes.header}>
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
                            Atlas
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
                    <Route exact path="/user/:id/edit">
                        <UserEditView/>
                    </Route>
                    <Route path="/jobs">
                        <ChangeRouteProvider routeMask="(/:panel)">
                            <RenderJobsView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/user">
                        <ChangeRouteProvider routeMask="(/:id(/:actions))">
                            <UserPageView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/organization">
                        <ChangeRouteProvider routeMask="(/:id)">
                            <OrganizationPageView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/submit">
                        <ChangeRouteProvider routeMask="(/:panel)">
                            <SubmitPageView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/createorganization">
                        <ChangeRouteProvider routeMask="(/:panel)">
                            <CreateOrganizationPageView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/plugin">
                        <ChangeRouteProvider routeMask="(/:create(/:id))">
                            <DndProvider backend={HTML5Backend}>
                                <CreatePluginPageView/>
                            </DndProvider>
                        </ChangeRouteProvider>
                    </Route>
                </Switch>
            </main>

        </Box>
    );
});

export default withStyles(styles)(MonitorLayout);
