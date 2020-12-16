/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 16.12.2020, 20:20
 * All rights reserved.
 */

import Stylable from "../../../../interfaces/Stylable";
import React, {Ref} from "react";
import styles from "./styles";
import {Grid, ListItem, ListItemSecondaryAction, ListItemText, Switch, withStyles} from "@material-ui/core";
import DemoRole from "../../../../interfaces/DemoRole";

interface RoleTogglesProps extends Stylable {
    handleSwitch(event: React.ChangeEvent<HTMLInputElement>):void;
    addRole: DemoRole;
}

const RoleToggles = React.forwardRef((props: RoleTogglesProps, ref: Ref<any>) => {
    const {
        style,
        classes,
        className,
        handleSwitch,
        addRole,
    } = props;

    return(
        <Grid item xs={12}>
            <ListItem className={classes.paddingNone}>
                <ListItemText primary="User manager" secondary="Can manage users"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canManageUsers}
                        onChange={handleSwitch}
                        name="canManageUsers"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.paddingNone}>
                <ListItemText primary="Jobs creator" secondary="Can create jobs"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canCreateJobs}
                        onChange={handleSwitch}
                        name="canCreateJobs"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.paddingNone}>
                <ListItemText primary="Jobs editor" secondary="Can edit jobs"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canEditJobs}
                        onChange={handleSwitch}
                        name="canEditJobs"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.paddingNone}>
                <ListItemText primary="Jobs delete" secondary="Can delete jobs"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canDeleteJobs}
                        onChange={handleSwitch}
                        name="canDeleteJobs"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.paddingNone}>
                <ListItemText primary="Roles manager" secondary="Can manage roles"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canManageRoles}
                        onChange={handleSwitch}
                        name="canManageRoles"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.paddingNone}>
                <ListItemText primary="Plugin manager" secondary="Can manage plugins"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canManagePlugins}
                        onChange={handleSwitch}
                        name="canManagePlugins"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.paddingNone}>
                <ListItemText primary="Team manager" secondary="Can manage teams"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canManageTeams}
                        onChange={handleSwitch}
                        name="canManageTeams"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.paddingNone}>
                <ListItemText primary="Audit editor" secondary="Can edit audit"/>
                <ListItemSecondaryAction>
                    <Switch
                        checked={addRole.canEditAudit}
                        onChange={handleSwitch}
                        name="canEditAudit"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </ListItemSecondaryAction>
            </ListItem>

        </Grid>
    )
});

export default withStyles(styles)(RoleToggles);