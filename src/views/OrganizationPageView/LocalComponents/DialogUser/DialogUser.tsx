/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 15:20
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {
    Dialog,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, Menu, MenuItem,
    withStyles,
} from "@material-ui/core";
import styles from "./styles";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import useConfirm from "../../../../hooks/useConfirm";
import Stylable from "../../../../interfaces/Stylable";
import UserData from "../../../../interfaces/UserData";
import Role from "../../../../interfaces/Role";

interface DialogUserProps extends Stylable {
    user: UserData | null;
    roles: Role[];
    open: boolean;

    onClose(): void;

    onRemove([]): void;

    onAddRole(role: number, []): void;

    onRemoveRole(role: number, []): void;
}

const DialogUser = React.forwardRef((props: DialogUserProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        user,
        roles,
        open,
        onClose,
        onRemove,
        onAddRole,
        onRemoveRole,
    } = props;


    const confirm = useConfirm();
    const [isAddRoleToUserButtonActive, setIsAddRoleToUserButtonActive] = useState<null | HTMLElement>(null);
    const [isRemoveRoleFromUserButtonActive, setIsRemoveRoleFromUserButtonActive] = useState<null | HTMLElement>(null);


    function handleOpenAddRoleToUserButtonActive(event: any) {
        setIsAddRoleToUserButtonActive(event.currentTarget);
    }

    function handleCloseAddRoleToUserButtonActive() {
        setIsAddRoleToUserButtonActive(null);
    }

    function handleOpenRemoveRoleFromUserButtonActive(event: any) {
        setIsRemoveRoleFromUserButtonActive(event.currentTarget);
    }

    function handleCloseRemoveRoleFromUserButtonActive() {
        setIsRemoveRoleFromUserButtonActive(null);
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className={classes.dialogUsers}>
                {user?.username}
            </DialogTitle>
            <List className={classes.dialog}>
                <ListItem>
                    <ListItemText>
                        Add role
                    </ListItemText>
                    <ListItemSecondaryAction
                        onClick={handleOpenAddRoleToUserButtonActive}
                    >
                        <IconButton>
                            <AddIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                    <Menu
                        id="simple-menu"
                        anchorEl={isAddRoleToUserButtonActive}
                        keepMounted
                        open={Boolean(isAddRoleToUserButtonActive)}
                        onClose={handleCloseAddRoleToUserButtonActive}
                    >
                        {roles.map(role => {
                            return (
                                <MenuItem
                                    key={role.id}
                                    onClick={() => onAddRole(role.id, [user?.id])}
                                >
                                    {role.name}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </ListItem>

                <ListItem>
                    <ListItemText>
                        Remove role
                    </ListItemText>
                    <ListItemSecondaryAction
                        onClick={handleOpenRemoveRoleFromUserButtonActive}
                    >
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                    <Menu
                        id="simple-menu-1"
                        anchorEl={isRemoveRoleFromUserButtonActive}
                        keepMounted
                        open={Boolean(isRemoveRoleFromUserButtonActive)}
                        onClose={handleCloseRemoveRoleFromUserButtonActive}
                    >
                        {user?.roles.map(role => {
                            return (
                                <MenuItem
                                    key={role.id}
                                    onClick={() => onRemoveRole(role.id, [user?.id])}
                                >
                                    {role.name}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </ListItem>

                <ListItem>
                    <ListItemText>
                        Delete User
                    </ListItemText>
                    <ListItemSecondaryAction
                        onClick={() => confirm(async () => onRemove([user?.id]), {title: `are you sure to delete user: ${user?.username} ?`})}
                    >
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Dialog>
    );
});

export default withStyles(styles)(DialogUser);