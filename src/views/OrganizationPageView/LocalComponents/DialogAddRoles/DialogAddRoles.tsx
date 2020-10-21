/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 21:47
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    Grid,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
    withStyles,
} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import {TwitterPicker} from "react-color";
import ColorPicker from "../../../../components/ColorPicker";

interface DialogAddRolesProps extends Stylable {
    open: boolean;

    onClose(): void;

    onAddRole(role: any): void;
}

const DialogAddRoles = React.forwardRef((props: DialogAddRolesProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        onClose,
        onAddRole
    } = props;

    const [addRole, setAddRole] = useState({name: "", description: "", permissionLevel: -1, color: ""});
    const [state, setState] = React.useState({
        checkedA: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleInputRole = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setAddRole(prev => ({...prev, [name]: event.target.value}));
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className={classes.dialogRoles}>
                Add new role
            </DialogTitle>
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
                            onChange={handleInputRole("name")}
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
                            onChange={handleInputRole("description")}
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
                            onChange={handleInputRole("permissionLevel")}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <ColorPicker/>
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
                        onClick={() => onAddRole(addRole)}
                    >
                        Add role
                    </Button>
                </Grid>
            </ListItem>
        </Dialog>
    );
});

export default withStyles(styles)(DialogAddRoles);