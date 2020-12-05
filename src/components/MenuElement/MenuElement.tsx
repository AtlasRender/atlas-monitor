/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 18:00
 * All rights reserved.
 */

import React, {Ref} from "react";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {useChangeRoute} from "routing-manager";

/**
 * MenuElementProps - interface for MenuElement component
 * @interface
 * @author Andrii Demchyshyn
 */
interface MenuElementProps extends Stylable {
    page: string;
    label: string;
    icon: React.ElementType;
}

/**
 * MenuElement - component for menu elements
 * @function
 * @author Andrii Demchyshyn
 */
const MenuElement = React.forwardRef((props: MenuElementProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        page,
        label,
        icon: Icon
    } = props;

    const {changeRoute} = useChangeRoute();

    return (
        <ListItem
            className={classes.container}
            button onClick={() => changeRoute({page: page, panel: null})}
        >
            <ListItemIcon className={classes.listIcon}>
                <Icon/>
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={label}/>
        </ListItem>
    );
});

export default withStyles(styles)(MenuElement);