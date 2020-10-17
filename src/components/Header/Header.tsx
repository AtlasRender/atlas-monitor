/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 17:02
 * All rights reserved.
 */

import React, {Ref} from "react";
import {AppBar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, withStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import styles from "./styles";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";

/**
 * HeaderProps - interface for Header component
 * @interface
 * @author Andrii Demchyshyn
 */
interface HeaderProps extends Stylable {

}

/**
 * DataTextField - returns Header component
 * @function
 * @author Andrii Demchyshyn
 */
const Header = React.forwardRef((props: HeaderProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return (
        <Box className={clsx(classes.root, className)}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Pathfinder
                    </Typography>
                </Toolbar>
            </AppBar>

        </Box>
    );
});
Header.displayName = "Header";
Header.propTypes = {}

export default withStyles(styles)(Header);
