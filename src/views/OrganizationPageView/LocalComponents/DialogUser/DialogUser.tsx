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
    Avatar, Box,
    Dialog,
    DialogTitle, Divider, Grid,
    IconButton,
    ListItem, ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem, Typography,
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

    onAddRole(roleId: number, user: number | undefined): void;

    onRemoveRole(roleId: number, userId: number | undefined): void;
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

    console.log();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <Box
                className={classes.userContainer}
                style={{background: `linear-gradient(45deg, #${user?.roles[0].color}, #fff 100%)`}}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.avatarContainer}>
                            <Avatar
                                className={classes.avatar}
                                src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.dialogUsers}>
                            {user?.username}
                        </Typography>
                        <Typography variant="body2" className={classes.info}>
                            JeyM1@gmail.com
                        </Typography>
                    </Grid>
                </Grid>
            </Box>


            <List>
                {/*<ListItem>*/}
                {/*    <ListItemText>*/}
                {/*        Add role*/}
                {/*    </ListItemText>*/}
                {/*    <ListItemSecondaryAction*/}
                {/*        onClick={handleOpenAddRoleToUserButtonActive}*/}
                {/*    >*/}
                {/*        <IconButton>*/}
                {/*            <AddIcon/>*/}
                {/*        </IconButton>*/}
                {/*    </ListItemSecondaryAction>*/}
                {/*    <Menu*/}
                {/*        id="simple-menu"*/}
                {/*        anchorEl={isAddRoleToUserButtonActive}*/}
                {/*        keepMounted*/}
                {/*        open={Boolean(isAddRoleToUserButtonActive)}*/}
                {/*        onClose={handleCloseAddRoleToUserButtonActive}*/}
                {/*    >*/}
                {/*        {roles.map(role => {*/}
                {/*            return (*/}
                {/*                <MenuItem*/}
                {/*                    key={role.id}*/}
                {/*                    onClick={() => onAddRole(role.id, user?.id)}*/}
                {/*                >*/}
                {/*                    {role.name}*/}
                {/*                </MenuItem>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </Menu>*/}
                {/*</ListItem>*/}

                <ListItem className={classes.listItemHeader}>
                    <ListItemText primaryTypographyProps={{variant: "h6"}}>
                        Roles
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
                                    onClick={() => onAddRole(role.id, user?.id)}
                                >
                                    {role.name}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </ListItem>
                <Divider/>

                {user?.roles.map((role) => {
                    return (
                        <ListItem>
                            <ListItemAvatar style={{minWidth: 16}}>
                                <Box className={classes.colorBar}
                                     style={{backgroundColor: `#${role.color}`}}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={role.name}
                                secondary={role.description}
                            />
                            <ListItemSecondaryAction
                                onClick={() => onRemoveRole(role.id, user?.id)}
                            >
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}

                <Divider/>

                {/*<ListItem>*/}
                {/*    <ListItemText>*/}
                {/*        Remove role*/}
                {/*    </ListItemText>*/}
                {/*    <ListItemSecondaryAction*/}
                {/*        onClick={handleOpenRemoveRoleFromUserButtonActive}*/}
                {/*    >*/}
                {/*        <IconButton>*/}
                {/*            <DeleteIcon/>*/}
                {/*        </IconButton>*/}
                {/*    </ListItemSecondaryAction>*/}
                {/*    <Menu*/}
                {/*        id="simple-menu-1"*/}
                {/*        anchorEl={isRemoveRoleFromUserButtonActive}*/}
                {/*        keepMounted*/}
                {/*        open={Boolean(isRemoveRoleFromUserButtonActive)}*/}
                {/*        onClose={handleCloseRemoveRoleFromUserButtonActive}*/}
                {/*    >*/}
                {/*        {user?.roles.map(role => {*/}
                {/*            return (*/}
                {/*                <MenuItem*/}
                {/*                    key={role.id}*/}
                {/*                    onClick={() => onRemoveRole(role.id, user?.id)}*/}
                {/*                >*/}
                {/*                    {role.name}*/}
                {/*                </MenuItem>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </Menu>*/}
                {/*</ListItem>*/}

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