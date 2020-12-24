/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Avatar, Box,
    Button,
    Checkbox,
    Dialog,
    DialogTitle, FilledInput, FormControl,
    IconButton, Input, InputAdornment,
    InputBase,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText, TextField,
    withStyles,
} from "@material-ui/core";
import styles from "./styles";
import List from "@material-ui/core/List";
import Stylable from "../../../../interfaces/Stylable";
import UserData from "../../../../interfaces/UserData";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import SearchBar from "../../../../components/SearchBar";

interface DialogAddUsersProps extends Stylable {
    open: boolean;
    allUsers?: UserData[] | null;
    newUsers: number[];
    availableUsers: UserData[];
    orgCreation?: boolean;

    onClose(): void;

    onNewUserClick(userId: number): void;

    onAdduser(usersIds: number[]): void;
}

const DialogAddUsers = React.forwardRef((props: DialogAddUsersProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        allUsers,
        newUsers,
        onClose,
        onNewUserClick,
        onAdduser,
        availableUsers,
    } = props;


    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className={classes.paddingNoneBottom}>
                Choose users to add
            </DialogTitle>
            <Box className={classes.searchBar}>
                <SearchBar/>
            </Box>
            <List className={classes.dialog}>
                {availableUsers.map((user) => (
                    <ListItem
                        button
                        key={user.id}
                        onClick={() => onNewUserClick(user.id)}
                    >
                        <ListItemAvatar>
                            <Avatar/>
                        </ListItemAvatar>
                        <ListItemText primary={user.username} secondary="department"/>
                        <Checkbox
                            checked={newUsers.includes(user.id)}
                            color="primary"
                            disableFocusRipple
                            disableTouchRipple
                            disableRipple
                            style={{backgroundColor: "transparent"}}
                            inputProps={{"aria-label": "secondary checkbox"}}
                        />
                    </ListItem>
                ))}
            </List>
            <Button fullWidth onClick={() => onAdduser(newUsers)}>Add new users</Button>
        </Dialog>
    );
});

export default withStyles(styles)(DialogAddUsers);