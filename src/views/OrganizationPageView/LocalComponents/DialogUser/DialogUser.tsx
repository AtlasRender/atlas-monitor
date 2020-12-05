/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    Divider,
    Grid,
    IconButton,
    InputBase,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Popover,
    Typography,
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
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

interface DialogUserProps extends Stylable {
    user: UserData | null;
    roles: Role[];
    open: boolean;

    onClose(): void;

    // TODO: what means empty array in function definition?
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
    const [filterRoles, setFilterRoles] = useState<Role[]>(roles);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setFilterRoles(roles.filter(role => role.name.toLowerCase().includes(searchValue)));
    }, [searchValue]);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value.toLowerCase());
    }

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


    console.log(user?.roles.length);



    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <Box
                className={classes.userContainer}
                style={user?.roles.length ? {background: `linear-gradient(45deg, #${user?.roles[0].color}, #fff 100%)`} : {background: `transparent`}}
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
                    <Popover
                        className={classes.menu}
                        id="simple-menu"
                        anchorEl={isAddRoleToUserButtonActive}
                        keepMounted
                        open={Boolean(isAddRoleToUserButtonActive)}
                        onClose={handleCloseAddRoleToUserButtonActive}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        classes={{
                            paper: classes.menuPaper,
                        }}
                    >
                        <ListItem className={classes.menuHeader}>
                            <ListItemText primaryTypographyProps={{variant: "h6"}}>
                                Add Role to User
                            </ListItemText>
                        </ListItem>
                        <Divider/>
                        <Box className={classes.search}>
                            <Box className={classes.searchIcon}>
                                <SearchIcon/>
                            </Box>
                            <InputBase
                                onChange={handleSearch}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{"aria-label": "search"}}
                            />
                            <IconButton>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        {filterRoles.length !== 0 ? filterRoles.map(role => {

                                return (
                                    <ListItem
                                        button
                                        key={role.id}
                                        onClick={() => onAddRole(role.id, user?.id)}
                                    >
                                        <ListItemText
                                            className={classes.menuListItemText}
                                            style={role.color ? {borderLeft: `4px solid #${role.color}`} : {borderLeft: 0}}
                                            primary={role.name}
                                            secondary={role.description}
                                        />
                                    </ListItem>
                                );
                            }) :
                            <Box className={classes.notFound}>
                                <Typography variant="h5" color="textSecondary">
                                    No roles found
                                </Typography>
                            </Box>
                        }
                    </Popover>
                </ListItem>
                <Divider/>

                {user?.roles.map((role) => {
                    return (
                        <ListItem>
                            <ListItemAvatar style={{minWidth: 16}}>
                                <Box className={classes.colorBar}
                                     style={role.color ? {backgroundColor: `#${role.color}`} : {backgroundColor: `transparent`}}/>
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

                <ListItem className={classes.dangerZoneHeader}>
                    <ListItemText primaryTypographyProps={{variant: "h6"}}>
                        Danger Zone
                    </ListItemText>
                </ListItem>
                <Divider className={classes.dangerZoneDivider}/>

                <Box className={classes.dangerZoneContainer}>
                    <Button
                        className={classes.dangerZoneButton}
                        variant="contained"
                        color="secondary"
                        onClick={() => confirm(async () => onRemove([user?.id]), {title: `are you sure you want to remove user: ${user?.username} ?`})}

                    >
                        Remove User from Organization
                    </Button>
                </Box>

                {/*<ListItem className={classes.dangerZone}>*/}
                {/*    <ListItemText>*/}
                {/*        Remove User from Organization*/}
                {/*     </ListItemText>*/}
                {/*    <ListItemSecondaryAction*/}
                {/*        onClick={() => confirm(async () => onRemove([user?.id]), {title: `are you sure you want to remove user: ${user?.username} ?`})}*/}
                {/*    >*/}
                {/*        <IconButton>*/}
                {/*            <DeleteIcon/>*/}
                {/*        </IconButton>*/}
                {/*    </ListItemSecondaryAction>*/}
                {/*</ListItem>*/}
            </List>
        </Dialog>
    );
});

export default withStyles(styles)(DialogUser);