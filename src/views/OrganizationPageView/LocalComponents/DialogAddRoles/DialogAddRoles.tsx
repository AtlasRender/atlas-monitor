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

    onAddRole(role: any, errors: any): void;

    onModifyRole?(roleId: number | undefined, roleToModify: any): void;
}

interface ValidationErrors {
    "noInputError": boolean;
    "nameError": boolean;
    "descriptionError": boolean;
    "permissionLevelError": boolean;
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

    const roleOpportunities = [
        {
            flag: false,
        },
        {
            flag: false,
        }
    ]


    const theme = useTheme();
    const [activeIds, setCurrentId] = useState<number[]>([]);
    const [addRole, setAddRole] = useState({
        name: "", description: "", color: "#fff", permissionLevel: -1,
    });
    const [errors, setErrors] = useState<ValidationErrors>({
        "noInputError": true,
        "nameError": false,
        "descriptionError": false,
        "permissionLevelError": false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (activeIds.includes(+event.target.id)) {
            setCurrentId(prev => prev.filter(id => id !== +event.target.id));
        } else {
            setCurrentId(prev => ([...prev, +event.target.id]));
        }
    };

    const handleInputRole = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setAddRole(prev => (prev && {...prev, [name]: event.target.value}));
    }

    function handleGetColor(inputColor: string) {
        setAddRole((prev) => (prev && {...prev, color: inputColor}));
    }

    const handleValidation = (event: React.FocusEvent<HTMLInputElement>) => {
        setErrors(prev => ({
            ...prev, "noInputError": false
        }))
        if (event.target.name === "name") {
            if (!addRole.name.match(/^[a-zA-Z]+$/) || !addRole.name || addRole.name.length < 3 || addRole.name.length > 50) {
                setErrors(prev => ({
                    ...prev, "nameError": true
                }))
            } else {
                setErrors(prev => ({
                    ...prev, "nameError": false
                }))
            }
        }
        if (event.target.name === "description") {
            if (!addRole.description || addRole.name.length > 500) {
                setErrors(prev => ({
                    ...prev, "descriptionError": true
                }))
            } else {
                setErrors(prev => ({
                    ...prev, "descriptionError": false
                }))
            }
        }
        if (event.target.name === "permissionLevel") {
            if (!addRole.permissionLevel || addRole.permissionLevel < 0 || addRole.permissionLevel > 1000) {
                setErrors(prev => ({
                    ...prev, "permissionLevelError": true
                }))
            } else {
                setErrors(prev => ({
                    ...prev, "permissionLevelError": false
                }))
            }
        }
    }

    function handleClick() {
        if (!errors.noInputError && !errors.nameError && !errors.descriptionError && !errors.permissionLevelError) {
            modify ? onModifyRole && onModifyRole(role?.id, addRole) : onAddRole(addRole, errors);
            setAddRole({
                name: "", description: "", color: "#fff", permissionLevel: -1,
            })
            setErrors({
                "noInputError": true,
                "nameError": false,
                "descriptionError": false,
                "permissionLevelError": false,
            });
        }
    }

    function handleOnClose() {
        setAddRole({
            name: "", description: "", color: "#fff", permissionLevel: -1,
        })
        setErrors({
            "noInputError": true,
            "nameError": false,
            "descriptionError": false,
            "permissionLevelError": false,
        });
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleOnClose}
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
                            error={errors.nameError}
                            variant="standard"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            defaultValue={role?.name}
                            onChange={handleInputRole("name")}
                            onBlur={handleValidation}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <TextField
                            error={errors.descriptionError}
                            variant="standard"
                            required
                            fullWidth
                            multiline
                            rows={2}
                            rowsMax={5}
                            name="description"
                            label="Description"
                            defaultValue={role?.description}
                            onChange={handleInputRole("description")}
                            onBlur={handleValidation}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <TextField
                            error={errors.permissionLevelError}
                            type="number"
                            variant="standard"
                            required
                            fullWidth
                            name="permissionLevel"
                            label="Permission Level"
                            defaultValue={role?.permissionLevel}
                            onChange={handleInputRole("permissionLevel")}
                            onBlur={handleValidation}
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
                                        <ListItemText primary="User manager" secondary="Can manage users"/>
                                        <ListItemSecondaryAction>
                                            <Switch
                                                id={`${role}`}
                                                checked={activeIds.includes(role)}
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
                        onClick={handleClick}
                    >
                        {modify ? "Modify" : "Add role"}
                    </Button>
                </Grid>
            </ListItem>
        </Dialog>
    );
});

export default withStyles(styles)(DialogAddRoles);