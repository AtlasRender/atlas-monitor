/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from "react";
import {
    Avatar,
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    IconButton,
    InputBase,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    withStyles,
} from "@material-ui/core";
import styles from "./styles";
import List from "@material-ui/core/List";
import Stylable from "../../../../interfaces/Stylable";
import UserData from "../../../../interfaces/UserData";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

interface DialogAddUsersProps extends Stylable {
    open: boolean;
    allUsers: UserData[] | null;
    newUsers: number[];

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
    } = props;


    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className={classes.paddingNoneBottom}>
                Choose users to add
            </DialogTitle>
            <List className={classes.dialog}>
                <ListItem>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{"aria-label": "search"}}
                        />
                    </div>
                    <IconButton>
                        <CloseIcon/>
                    </IconButton>
                </ListItem>
                {allUsers?.map((user) => (
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
                                style={{ backgroundColor: 'transparent'}}
                                inputProps={{"aria-label": "secondary checkbox"}}
                            />
                    </ListItem>
                ))}
                <ListItem>
                    <Button fullWidth onClick={() => onAdduser(newUsers)}>Add new users</Button>
                </ListItem>
            </List>
        </Dialog>
    );
});

export default withStyles(styles)(DialogAddUsers);