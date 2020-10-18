/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 17:19
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputBase,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    useMediaQuery,
    useTheme,
    withStyles,
} from "@material-ui/core";
import styles from "./styles";
import DataTextField from "../../components/DataTextField";
import TopicWithButton from "./LocalComponents/TopicWithButton";
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import PluginComponent from "./LocalComponents/PluginComponent";
import Stylable from "../../interfaces/Stylable";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import useCoreRequest from "../../hooks/useCoreRequest";
import {useChangeRoute} from "routing-manager";
import Organization from "../../interfaces/Organization";
import UserData from "../../interfaces/UserData";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";
import Role from "../../interfaces/Role";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

/**
 * OrganizationPageViewPropsStyled - interface for OrganizationPageView function
 * @interface
 * @author Nikita Nesterov
 */
interface OrganizationPageViewProps extends Stylable {

}

interface Users {
    name: string;
    role: string;
    id: number;
    department: string;
}

const OrganizationPageView = React.forwardRef((props: OrganizationPageViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;


    //basic
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const coreRequest = useCoreRequest();
    const {getRouteParams} = useChangeRoute();
    const {id} = getRouteParams();


    //roles
    const [isAddRoleButtonActive, setIsAddRoleButtonActive] = useState(false);
    const [isAddRoleToUserButtonActive, setIsAddRoleToUserButtonActive] = useState<null | HTMLElement>(null);
    const [isRemoveRoleFromUserButtonActive, setIsRemoveRoleFromUserButtonActive] = useState<null | HTMLElement>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [addRole, setAddRole] = useState({name: "", description: "", permissionLevel: -1, color: ""});
    const [role, setRole] = useState<Role | null>(null);
    const [roleUsers, setRoleUsers] = useState<UserData[] | null>(null);


    //organizations and users
    const [isUserActive, setIsUserActive] = useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [isUserSettingsButtonActive, setIsUserSettingsButtonActive] = useState(false);
    const [organizationData, setOrganizationData] = useState<Organization | null>(null);
    const [allUsers, setAllUsers] = useState<UserData[] | null>(null);
    const [newUsers, setNewUsers] = useState<number[]>([]);
    const [organizationUsers, serOrganizationUsers] = useState<UserData[]>([]);


    useEffect(() => {
        handleGetOrganization();
        handleGetAllUsers();
        handleGetOrganizationUsers();
        handleGetRoles();
    }, []);


    //roles
    function handleGetRoles() {
        coreRequest()
            .get(`organizations/${id}/roles`)
            .then((response) => {
                setRoles(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get roles");
            })
    }

    function handleGetRoleById(roleId: number) {
        coreRequest()
            .get(`organizations/${id}/roles/${roleId}`)
            .then((response) => {
                setRole(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get role by id");
            })
    }

    function handleGetRoleUsers(roleId: number) {
        coreRequest()
            .get(`organizations/${id}/roles/${roleId}/users`)
            .then((response) => {
                setRoleUsers(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get role by id");
            })
    }

    function handleAddRoleToUser(roleId: number, usersToAddRoleId: number[]) {
        setIsAddRoleToUserButtonActive(null);
        coreRequest()
            .post(`organizations/${id}/roles/${roleId}/users`)
            .send({userIds: usersToAddRoleId})
            .then((response) => {
                handleGetOrganizationUsers();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get role by id");
            })
    }

    function handleRemoveRoleFromUser(roleId: number, usersToRemoveRoleId: number[]) {
        setIsRemoveRoleFromUserButtonActive(null);
        coreRequest()
            .delete(`organizations/${id}/roles/${roleId}/users`)
            .send({userIds: usersToRemoveRoleId})
            .then((response) => {
                handleGetOrganizationUsers();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get role by id");
            })
    }

    function handleAddRole() {
        setIsAddRoleButtonActive(false);
        const addNewRole = addRole;
        addNewRole.permissionLevel = +addNewRole.permissionLevel;
        coreRequest()
            .post(`organizations/${id}/roles`)
            .send(addNewRole)
            .then((response) => {
                handleGetRoles();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant add role");
            })
    }

    function handleDeleteRole(roleId: number) {
        coreRequest()
            .delete(`organizations/${id}/roles/${roleId}`)
            .then((response) => {
                handleGetRoles();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant add role");
            })
    }

    function handleInputRole(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setAddRole(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    function handleIsAddRoleButtonActive() {
        setIsAddRoleButtonActive(!isAddRoleButtonActive);
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

    //organizations and users
    function handleGetOrganizationUsers() {
        coreRequest()
            .get(`organizations/${id}/users`)
            .then((response) => {
                serOrganizationUsers(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get roles");
            })
    }

    function handleGetOrganization() {
        coreRequest()
            .get(`organizations/${id}`)
            .then((response) => {
                setOrganizationData(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("No such user");
            });
    }

    function handleGetAllUsers() {
        coreRequest()
            .get("users")
            .then((response) => {
                setAllUsers(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get users");
            });
    }

    function handleAddUser(usersToAddId: number[]) {
        setIsButtonActive(false);
        setIsUserActive(true);
        coreRequest()
            .post(`organizations/${id}/users`)
            .send({userIds: usersToAddId})
            .then(response => {
                handleGetOrganization();
                handleGetOrganizationUsers();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("No such user");
            })
    }

    function handleRemoveUser(usersToDeleteIds: number[]) {
        setIsUserSettingsButtonActive(false);
        coreRequest()
            .delete(`organizations/${id}/users`)
            .send({userIds: usersToDeleteIds})
            .then(response => {
                handleGetOrganization();
                handleGetOrganizationUsers();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar(err.message);
            })
    }

    function handleNewUsersClick(newUserId: number) {
        let newUsersArray = newUsers;
        if (newUsers.includes(newUserId)) {
            newUsersArray = newUsersArray.filter(userId => userId !== newUserId);
            setNewUsers(newUsersArray);
        } else {
            setNewUsers([...newUsers, newUserId])
        }
    }

    function handleClick() {
        setIsOpen(!isOpen);
    }

    function handleIsUserActive() {
        setIsUserActive(true);
    }

    function handleIsButtonActive() {
        setIsButtonActive(true);
    }

    function handleIsUserSettingsButtonActive() {
        setIsUserSettingsButtonActive(true);
    }

    const slaves = [
        "Kiev slave",
        "Harkov slave",
        "Lvov slave",
    ]


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let mainInfo;
    if (matches) {
        mainInfo = (
            <Box className={classes.container}>
                <Grid container className={classes.firstLine}>
                    <Grid item xs={8}>
                        <Box>
                            <Grid container spacing={2} className={classes.nameDescription}>
                                <Grid item xs={6}>
                                    <DataTextField label="Organization name" children={organizationData?.name}/>
                                </Grid>
                                <Grid item xs={6}/>
                                <Grid item xs={10}>
                                    <DataTextField label="description" children="Lorem ipsum"/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar
                            src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg"
                            className={classes.avatar}
                        />
                    </Grid>
                </Grid>
            </Box>
        )
    } else {
        mainInfo = (
            <Grid container spacing={2} className={classes.firstLine}>
                <Box className={classes.avatarBox}>
                    <Avatar src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg" className={classes.avatar}/>
                </Box>
                <Grid item xs={10}>
                    <DataTextField label="Organization name" children="Blizzard entertainment"/>
                </Grid>
                <Grid item xs={10}>
                    <DataTextField label="description"
                                   children="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem, dolorum nam quidem sint sunt!"/>
                </Grid>
            </Grid>
        )
    }

    let {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={path}>
                <Box>
                    {mainInfo}
                    <TopicWithButton children="Slaves"/>
                    <Grid container className={classes.firstLine}>
                        <Grid item xs={10}>
                            {slaves.map((slave, key) => {
                                return (
                                    <ListItem key={key}>
                                        <ListItemIcon>
                                            <BuildIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={slave}
                                            secondary="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, rerum?"
                                        />

                                        <ListItemSecondaryAction>
                                            <IconButton><SettingsIcon/></IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </Grid>
                    </Grid>

                    <Grid container className={classes.firstLine}>
                        <Grid item xs={10}>
                            <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem className={classes.paddingNone}>
                                    <ListItemText primary="Roles" primaryTypographyProps={{variant: "h6"}}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={handleIsAddRoleButtonActive}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider/>
                            </List>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.firstLine}>
                        <Grid item xs={10}>
                            {isAddRoleButtonActive &&
                            <ListItem className={classes.newRole}>
                                <Grid container>
                                    <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="name"
                                            label="Name"
                                            autoFocus
                                            onChange={handleInputRole}
                                        />
                                    </Grid>
                                    <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="description"
                                            label="Description"
                                            autoFocus
                                            onChange={handleInputRole}
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
                                            autoFocus
                                            onChange={handleInputRole}
                                        />
                                    </Grid>
                                    <Grid item xs={6} className={clsx(classes.roleAdd, classes.spacingInNewRole)}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="color"
                                            label="Color"
                                            autoFocus
                                            onChange={handleInputRole}
                                        />
                                    </Grid>
                                    <Button fullWidth onClick={handleAddRole}>
                                        Add role
                                    </Button>
                                </Grid>
                            </ListItem>
                            }
                            {roles.map((role) => {
                                return (
                                    <ListItem key={role.id}>
                                        <ListItemText
                                            primary={role.name}
                                            secondary={`color: ${role.color}`}
                                        />
                                        <ListItemSecondaryAction onClick={() => handleDeleteRole(role.id)}>
                                            <IconButton>
                                                <SettingsIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </Grid>
                    </Grid>

                    <Grid container className={classes.firstLine}>
                        <Grid item xs={10}>
                            <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem className={classes.paddingNone}>
                                    <ListItemText primary="Members" primaryTypographyProps={{variant: "h6"}}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={handleIsButtonActive}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider/>
                            </List>
                        </Grid>
                    </Grid>

                    <Dialog
                        open={isButtonActive}
                        onClose={() => setIsButtonActive(false)}
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
                                        inputProps={{'aria-label': 'search'}}
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
                                    onClick={() => handleNewUsersClick(user.id)}
                                >
                                    <ListItemAvatar>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.username} secondary="department"/>

                                    <ListItemSecondaryAction>

                                        <Checkbox
                                            checked={newUsers.includes(user.id)}
                                            color="primary"
                                            inputProps={{'aria-label': 'secondary checkbox'}}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            <ListItem>
                                <Button fullWidth onClick={() => handleAddUser(newUsers)}>Add new users</Button>
                            </ListItem>
                        </List>
                    </Dialog>

                    <Grid container className={classes.firstLine} spacing={0}>
                        {organizationUsers.map((user: UserData, key: number) => {
                            return (
                                <Grid item xs={10} key={key}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg"/>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} secondary={user.email}/>
                                        <ListItemSecondaryAction>
                                            {user.roles.map(role => {
                                                // let maxPermissionLevel = 100;
                                                //
                                                // if (maxPermissionLevel >= role.permissionLevel) {
                                                //     maxPermissionLevel = role.permissionLevel;
                                                // }
                                                return (
                                                    <Select
                                                        key={role.id}
                                                        style={{width: 100}}
                                                        name={"" + user.id} // why id?
                                                        value={role.name}
                                                        label="Admin"
                                                        className={classes.selectFieldStyle}
                                                    >
                                                        <MenuItem value={role.name}>{role.name}</MenuItem>
                                                        <MenuItem value="member">Member</MenuItem>
                                                        <MenuItem value="moderator">Moderator</MenuItem>
                                                    </Select>
                                                )
                                            })}
                                            <IconButton onClick={handleIsUserSettingsButtonActive}>
                                                <SettingsIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>


                                        <Dialog
                                            open={isUserSettingsButtonActive}
                                            onClose={() => setIsUserSettingsButtonActive(false)}
                                        >
                                            <DialogTitle className={classes.dialogUsers}>
                                                {user.username}
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
                                                                    onClick={() => handleAddRoleToUser(role.id, [user.id])}
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
                                                        {user.roles.map(role => {
                                                            return (
                                                                <MenuItem
                                                                    key={role.id}
                                                                    onClick={() => handleRemoveRoleFromUser(role.id, [user.id])}
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
                                                        onClick={() => handleRemoveUser([user.id])}
                                                    >
                                                        <IconButton>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </List>
                                        </Dialog>


                                    </ListItem>
                                </Grid>
                            )
                        })}
                    </Grid>


                    <TopicWithButton children="Plugins"/>
                    <PluginComponent plugin="GachiWork" description="best remixes of all time"/>
                </Box>
            </Route>
        </Switch>

    );
})

export default withStyles(styles)(OrganizationPageView)