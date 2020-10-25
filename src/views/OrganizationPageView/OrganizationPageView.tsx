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
    Box, Chip,
    Divider,
    Grid,
    IconButton,
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
import BuildIcon from "@material-ui/icons/Build";
import SettingsIcon from "@material-ui/icons/Settings";
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
import Role from "../../interfaces/Role";
import useConfirm from "../../hooks/useConfirm";
import DialogUser from "./LocalComponents/DialogUser";
import DialogAddUsers from "./LocalComponents/DialogAddUsers";
import AddRoleField from "./LocalComponents/AddRoleField";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DialogAddRoles from "./LocalComponents/DialogAddRoles";

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
    const confirm = useConfirm();


    //roles
    const [isAddRoleButtonActive, setIsAddRoleButtonActive] = useState(false);
    const [isDialogModifyRoleButtonActive, setIsDialogModifyRoleButtonActive] = useState(false);
    const [isAddRoleToUserButtonActive, setIsAddRoleToUserButtonActive] = useState<null | HTMLElement>(null);
    const [isRemoveRoleFromUserButtonActive, setIsRemoveRoleFromUserButtonActive] = useState<null | HTMLElement>(null);
    const [isModifyRoleButtonActive, setIsModifyRoleButtonActive] = useState<null | HTMLElement>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [roleToChange, setRole] = useState<Role>();
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
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);


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

    async function handleGetRoleById(roleId: number) {
        try {
            const response = await coreRequest()
                .get(`organizations/${id}/roles/${roleId}`);
            setRole(response.body);
        } catch (err) {
            enqueueErrorSnackbar("Cant get role by id");
        }
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

    function handleAddRoleToUser(roleId: number, userToAddRoleId: number) {
        setIsAddRoleToUserButtonActive(null);
        console.log(userToAddRoleId);
        coreRequest()
            .post(`organizations/${id}/roles/${roleId}/users`)
            .send({userId: userToAddRoleId})
            .then((response) => {
                handleGetOrganizationUsers();
                handleGetRoles();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get role by id");
            })
    }

    function handleRemoveRoleFromUser(roleId: number, userToRemoveRoleId: number) {
        setIsRemoveRoleFromUserButtonActive(null);
        coreRequest()
            .delete(`organizations/${id}/roles/${roleId}/users`)
            .send({userId: userToRemoveRoleId})
            .then((response) => {
                handleGetOrganizationUsers();
                handleGetRoles();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get role by id");
            })
    }

    function handleAddRole(roleToAdd: any) {
        setIsAddRoleButtonActive(false);
        const addNewRole = roleToAdd;
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
        setIsModifyRoleButtonActive(null);
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

    function handleModifyRole(roleId: number, roleToModify: any) {
        setIsDialogModifyRoleButtonActive(false);
        roleToModify.permissionLevel = +roleToModify.permissionLevel;
        coreRequest()
            .post(`organizations/${id}/roles/${roleId}`)
            .send(roleToModify)
            .then((response) => {
                handleGetRoles();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant edit role");
            })
    }

    function handleIsAddRoleButtonActive() {
        setIsAddRoleButtonActive(!isAddRoleButtonActive);
    }

    function handleOpenModifyRoleButtonActive(event: any) {
        setIsModifyRoleButtonActive(event.currentTarget);
    }

    function handleCloseModifyRoleButtonActive() {
        setIsModifyRoleButtonActive(null);
    }

    function handleIsDialogModifyRoleButtonActive(roleId: number) {
        handleGetRoleById(roleId).then(() => setIsDialogModifyRoleButtonActive(true));
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

    function handleIsUserSettingsButtonActive(user: UserData) {
        setIsUserSettingsButtonActive(true);
        setCurrentUser(user);
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

                    <DialogAddRoles
                        open={isAddRoleButtonActive}
                        onClose={() => setIsAddRoleButtonActive(false)}
                        onAddRole={handleAddRole}
                        onModifyRole={handleModifyRole}
                    />

                    <Grid container className={classes.firstLine}>
                        <Grid item xs={10}>
                            {roles.map((role) => {
                                return (
                                    <ListItem key={role.id}>
                                        <ListItemAvatar style={{minWidth: 16}}>
                                            <Box className={classes.colorBar}
                                                 style={{backgroundColor: `#${role.color}`}}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={role.name}
                                            secondary={role.description}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                style={{marginRight: theme.spacing(0)}}
                                                onClick={() => handleIsDialogModifyRoleButtonActive(role.id)}
                                            >
                                                <EditIcon/>
                                            </IconButton>

                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => confirm(async () => handleDeleteRole(role.id),
                                                    {title: `are you sure to delete role: ${role.name} ?`})}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </Grid>
                    </Grid>

                    <DialogAddRoles
                        open={isDialogModifyRoleButtonActive}
                        onClose={() => setIsDialogModifyRoleButtonActive(false)}
                        role={roleToChange}
                        modify={true}
                        onAddRole={handleAddRole}
                        onModifyRole={handleModifyRole}
                    />

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

                    <DialogAddUsers
                        open={isButtonActive}
                        onClose={() => setIsButtonActive(false)}
                        allUsers={allUsers}
                        newUsers={newUsers}
                        onNewUserClick={handleNewUsersClick}
                        onAdduser={handleAddUser}
                    />

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
                                            <Chip label={user.roles[0].name}
                                                  style={{backgroundColor: `#${roles[0].color}`}}
                                            />
                                            <IconButton onClick={() => handleIsUserSettingsButtonActive(user)}>
                                                <SettingsIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Grid>
                            )
                        })}
                    </Grid>

                    <DialogUser
                        open={isUserSettingsButtonActive}
                        onClose={() => setIsUserSettingsButtonActive(false)}
                        user={currentUser}
                        roles={roles}
                        onRemove={handleRemoveUser}
                        onAddRole={handleAddRoleToUser}
                        onRemoveRole={handleRemoveRoleFromUser}
                    />

                    <TopicWithButton children="Plugins"/>
                    <PluginComponent plugin="GachiWork" description="best remixes of all time"/>
                </Box>
            </Route>
        </Switch>

    );
})

export default withStyles(styles)(OrganizationPageView);
