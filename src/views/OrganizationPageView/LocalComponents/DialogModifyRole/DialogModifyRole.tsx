/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 18:28
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    Divider,
    Grid,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, Switch,
    withStyles,
} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Role from "../../../../interfaces/Role";
import ColorPicker from "../../../../components/ColorPicker/ColorPicker";

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
    const [state, setState] = React.useState({
        checkedA: true,
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    useEffect(() => {
        setModifiedRole({
            name: role?.name, description: role?.description,
            permissionLevel: role?.permissionLevel, color: role?.color
        })
    }, [role])

    const handleInputModifiedRole = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setModifiedRole(prev => ({...prev, [name]: event.target.value}));
    }

    function handleGetColor(inputColor: string) {
        setModifiedRole((prev) => ({...prev, color: inputColor}));
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className={classes.dialogRoles} style={{background: `#${modifiedRole.color}`}}>
                Add new role
            </DialogTitle>
            <Divider/>
            <ListItem className={classes.newRole}>
                <Grid container>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            autoFocus
                            onChange={handleInputModifiedRole("name")}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            autoFocus
                            onChange={handleInputModifiedRole("description")}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <TextField
                            type="number"
                            variant="standard"
                            required
                            fullWidth
                            name="permissionLevel"
                            label="Permission Level"
                            autoFocus
                            onChange={handleInputModifiedRole("permissionLevel")}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <ColorPicker
                            onChange={handleGetColor}
                            color={modifiedRole.color}
                        />
                    </Grid>
                    <Grid container className={classes.firstLine}>
                        <Grid item xs={12}>
                            <ListItem className={classes.paddingNone}>
                                <ListItemText primary="Roles" secondary="description"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.paddingNone}>
                                <ListItemText primary="Roles" secondary="description"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.paddingNone}>
                                <ListItemText primary="Roles" secondary="description"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.paddingNone}>
                                <ListItemText primary="Roles" secondary="description"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        onClick={() => onModifyRole(role?.id, modifiedRole)}
                    >
                        Add role
                    </Button>
                </Grid>
            </ListItem>
        </Dialog>
    );
});

export default withStyles(styles)(DialogModifyRole);