/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 17:03
 * All rights reserved.
 */

import React, {Ref} from "react";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";

interface LeftsideMenuPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const LeftsideMenu = React.forwardRef((props: LeftsideMenuPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        style,
        className
    } = props;

    function MenuBlock() {
        return(
            <div className={clsx(classes.menuBlockRoot, className)}>

            </div>
        );
    }

    return (
        <div className={clsx(classes.grow, className)} ref={ref}>
            <MenuBlock />
        </div>
    );
});
LeftsideMenu.displayName = "LeftsideMenu";
LeftsideMenu.propTypes = {}


export default withStyles(styles)(LeftsideMenu);