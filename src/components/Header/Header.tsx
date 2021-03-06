/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React, {Ref} from "react";
import {AppBar, Box, Toolbar, Typography, withStyles} from "@material-ui/core";
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
                <Toolbar className={classes.header}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Pathfinder
                    </Typography>
                </Toolbar>
            </AppBar>

        </Box>
    );
});
Header.displayName = "Header";
Header.propTypes = {};

export default withStyles(styles)(Header);
