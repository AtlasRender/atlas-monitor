/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 23.10.2020, 18:41
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {ListItem, ListItemSecondaryAction, ListItemText, Switch, withStyles,} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../../../interfaces/Stylable";

interface OpportunitiesPickerProps extends Stylable {

}

const OpportunitiesPicker = React.forwardRef((props: OpportunitiesPickerProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
    } = props;

    const [role, setRole] = useState(0);

    function handleChange() {
        setRole(1);
    }

    return (
        <React.Fragment>
            <ListItem className={classes.paddingNone}>
                <ListItemText primary="User manager" secondary="Can manage users"/>
                <ListItemSecondaryAction>
                    <Switch
                        id={`${role}`}
                        // checked={role.can_manage}
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
});

export default withStyles(styles)(OpportunitiesPicker);