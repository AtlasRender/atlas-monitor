/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 21:47
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogTitle, Divider,
    Grid,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Switch, useTheme,
    withStyles,
} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import ColorPicker from "../../../../components/ColorPicker";
import Role from "../../../../interfaces/Role";

interface DialogAddRolesProps extends Stylable {
    open: boolean;
    role?: Role;
    modify?: boolean;

    onClose(): void;

    onAddRole(role: any): void;

    onModifyRole(roleId: number | undefined, roleToModify: any): void;
}

const DialogAddRoles = React.forwardRef((props: DialogAddRolesProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        modify,
        role,
        open,
        onClose,
        onAddRole,
        onModifyRole,
    } = props;

    const theme = useTheme();
    const [currentId, setCurrentId] = useState<number[]>([]);
    const [addRole, setAddRole] = useState({
        name: "", description: "", color: "#fff", permissionLevel: -1,
    });

    const [state, setState] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(currentId);
        let currentIdCopy = currentId;
        if(currentIdCopy.includes(+event.target.id)) {
            currentIdCopy = currentIdCopy.filter(id => id !== +event.target.id);
            setCurrentId(currentIdCopy);
        } else {
            setCurrentId(prev => ([...prev, +event.target.id]));
        }
        setState(event.target.checked);
    };

    const handleInputRole = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setAddRole(prev => (prev && {...prev, [name]: event.target.value}));
    }

    function handleGetColor(inputColor: string) {
        setAddRole((prev) => (prev && {...prev, color: inputColor}));
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle
                className={classes.dialogRoles}
                style={{background: `#${addRole?.color}`, color: theme.palette.getContrastText(`#${addRole?.color}`)}}
            >
                {modify ? "Modify role" : "Add new role"}
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
                            defaultValue={role?.name}
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
                            defaultValue={role?.description}
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
                            defaultValue={role?.permissionLevel}
                            autoFocus
                            onChange={handleInputRole("permissionLevel")}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <ColorPicker
                            onChange={handleGetColor}
                            color={role?.color}
                        />
                    </Grid>
                    <Grid container className={classes.firstLine}>
                        <Grid item xs={12}>
                            {[0, 1, 2, 3].map((role, key) => {
                                return (
                                    <ListItem className={classes.paddingNone} key={key}>
                                        <ListItemText primary="Roles" secondary="description"/>
                                        <ListItemSecondaryAction>
                                            <Switch
                                                id={`${role}`}
                                                checked={currentId.includes(role) && state}
                                                onChange={handleChange}
                                                name="checkedA"
                                                inputProps={{"aria-label": "secondary checkbox"}}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        onClick={() => {
                            modify ? onModifyRole(role?.id, addRole) : onAddRole(addRole)
                        }}
                    >
                        {modify ? "Modify" : "Add role"}
                    </Button>
                </Grid>
            </ListItem>
        </Dialog>
    );
});

export default withStyles(styles)(DialogAddRoles);