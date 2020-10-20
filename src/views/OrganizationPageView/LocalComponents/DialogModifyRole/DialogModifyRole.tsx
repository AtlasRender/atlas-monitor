/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 18:28
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {Button, Dialog, DialogTitle, Grid, withStyles,} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Role from "../../../../interfaces/Role";

interface DialogModifyRoleProps extends Stylable {
    open: boolean;
    role: Role | null;

    onClose(): void;

    onModifyRole(roleId: number | undefined, roleToModify: any): void;

}

const DialogModifyRole = React.forwardRef((props: DialogModifyRoleProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        role,
        onClose,
        onModifyRole,
    } = props;


    const [modifiedRole, setModifiedRole] = useState({
        name: role?.name, description: role?.description,
        permissionLevel: role?.permissionLevel, color: role?.color
    });

    useEffect(() => {
        setModifiedRole({
            name: role?.name, description: role?.description,
            permissionLevel: role?.permissionLevel, color: role?.color
        })
    }, [role])

    function handleInputModifiedRole(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setModifiedRole(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className={classes.dialogRoles}>
                Modify role
            </DialogTitle>
            <Grid container>
                <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        autoFocus
                        defaultValue={role?.name}
                        InputLabelProps={{shrink: true}}
                        onChange={handleInputModifiedRole}
                    />
                </Grid>
                <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        defaultValue={role?.description}
                        autoFocus
                        InputLabelProps={{shrink: true}}
                        onChange={handleInputModifiedRole}
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
                        defaultValue={role?.permissionLevel}
                        autoFocus
                        InputLabelProps={{shrink: true}}
                        onChange={handleInputModifiedRole}
                    />
                </Grid>
                <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        name="color"
                        label="Color"
                        defaultValue={role?.color}
                        autoFocus
                        InputLabelProps={{shrink: true}}
                        onChange={handleInputModifiedRole}
                    />
                </Grid>
                <Button
                    fullWidth
                    onClick={() => onModifyRole(role?.id, modifiedRole)}
                >
                    Save
                </Button>
            </Grid>
        </Dialog>
    );
});

export default withStyles(styles)(DialogModifyRole);