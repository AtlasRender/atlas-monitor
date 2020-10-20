/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 18:01
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {
    Button,
    Grid,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    withStyles,
} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../../../interfaces/Stylable";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import SettingsIcon from "@material-ui/icons/Settings";

interface AddRoleFieldProps extends Stylable {
    onAddRole(role: any): void;
}

const AddRoleField = React.forwardRef((props: AddRoleFieldProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        onAddRole,
    } = props;

    const [addRole, setAddRole] = useState({name: "", description: "", permissionLevel: -1, color: ""});


    function handleInputRole(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setAddRole(prev => ({...prev, [event.target.name]: event.target.value}));
    }


    return (
        <React.Fragment>
            <ListItem className={classes.newRole}>
                <Grid container>
                    <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            autoFocus
                            onChange={handleInputRole}
                        />
                    </Grid>
                    <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            autoFocus
                            onChange={handleInputRole}
                        />
                    </Grid>
                    <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                        <TextField
                            type="number"
                            variant="standard"
                            required
                            fullWidth
                            name="permissionLevel"
                            label="Permission Level"
                            autoFocus
                            onChange={handleInputRole}
                        />
                    </Grid>
                    <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            name="color"
                            label="Color"
                            autoFocus
                            onChange={handleInputRole}
                        />
                    </Grid>
                    <Button fullWidth onClick={() => onAddRole(addRole)}>
                        Add role
                    </Button>
                </Grid>
            </ListItem>
        </React.Fragment>
    );

});

export default withStyles(styles)(AddRoleField);