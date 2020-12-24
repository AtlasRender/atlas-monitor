/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    withStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";
import DialogAddRoles from "../OrganizationPageView/LocalComponents/DialogAddRoles/DialogAddRoles";
import Role from "../../interfaces/Role";
import {useChangeRoute} from "routing-manager";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useConfirm from "../../hooks/useConfirm";
import UserData from "../../interfaces/UserData";
import useCoreRequest from "../../hooks/useCoreRequest";
import useAuth from "../../hooks/useAuth";
import ErrorHandler from "../../utils/ErrorHandler";
import useEnqueueSuccessSnackbar from "../../utils/EnqueSuccessSnackbar";
import DialogAddUsers from "../OrganizationPageView/LocalComponents/DialogAddUsers";
import DemoRole from "../../interfaces/DemoRole";
import {yellow} from "@material-ui/core/colors";


interface CreateOrganizationPageProps extends Stylable {

}

const CreateOrganizationPageView = React.forwardRef((props: CreateOrganizationPageProps, ref: Ref<any>) => {
    const {
        style,
        className,
        classes,
    } = props;


    const {logout} = useAuth();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const enqueueSuccessSnackbar = useEnqueueSuccessSnackbar();
    const {getRouteParams, changeRoute} = useChangeRoute();
    const coreRequest = useCoreRequest();
    const {getUser} = useAuth();
    const confirm = useConfirm();


    const [addRoleButton, setAddRoleButton] = useState<boolean>(false);
    const [modify, setModify] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [errors, setErrors] = useState({
        nameError: false,
        nameMessage: "",
        descriptionError: false,
        descriptionMessage: "",
    });

    const [defaultRole, setDefaultRole] = useState<DemoRole>({
        id: -1,
        name: "user",
        description: "Default user role.",
        color: "090",
        permissionLevel: 0,
        canManageUsers: false,
        canManageRoles: false,
        canCreateJobs: true,
        canDeleteJobs: false,
        canEditJobs: false,
        canManagePlugins: true,
        canManageTeams: true,
        canEditAudit: true,
    });

    const [owner, setOwner] = useState<UserData>();
    const [roles, setRoles] = useState<DemoRole[]>([]);
    const [roleToModify, setRoleToModify] = useState<DemoRole>();
    const [users, setUsers] = useState<UserData[]>([]);
    const [members, setMembers] = useState<UserData[]>([]);
    const [addMemberButton, setAddMemberButton] = useState<boolean>(false);
    const [defaultRoleId, setDefaultRoleId] = useState<number>(defaultRole.id);
    const [isDefault, setIsDefault] = useState<boolean>(false);

    useEffect(() => {
        setDefaultRoleId(defaultRole.id);
    }, [defaultRole]);


    //For dialog-----------------------------------------------------------------------------------------
    const [newUsers, setNewUsers] = useState<number[]>([]);
    const [availableUsers, setAvailableUsers] = useState<UserData[]>([]);


    function handleNewUsersClick(newUserId: number) {
        let newUsersArray = newUsers;
        if (newUsers.includes(newUserId)) {
            newUsersArray = newUsersArray.filter(userId => userId !== newUserId);
            setNewUsers(newUsersArray);
        } else {
            setNewUsers([...newUsers, newUserId]);
        }
    }

    function handleAddUser(usersToAddId: number[]) {
        for (let i = 0; i < usersToAddId.length; i++) {
            const newMember = users.filter(user => user.id === usersToAddId[i]);
            if (newMember[0].id !== owner?.id) {
                setMembers(prev => ([...prev, newMember[0]]));
            }
        }
        setAddMemberButton(!addMemberButton);
        setNewUsers([]);
    }

    function handleGetAvailableUsers() {
        let availableMembers: UserData[] = users;
        availableMembers = availableMembers.filter(user => user.id !== owner?.id);
        for (let i = 0; i < members.length; i++) {
            availableMembers = availableMembers.filter(user => (user.id !== members[i].id && user.id !== owner?.id));
        }
        setAvailableUsers(availableMembers);
    }

    const handleCloseDialogAddUser = () => {
        setAddMemberButton(!addMemberButton);
        setNewUsers([]);
    };

    useEffect(() => {
        if (owner) {
            handleGetAvailableUsers();
        }
    }, [owner]);

    useEffect(() => {
        handleGetAvailableUsers();
    }, [members]);

    //----------------------------------------------------------------------------------------------------


    const theme = useTheme();
    let info;

    useEffect(() => {
        addRole(defaultRole);
    }, []);

    function addRole(role: DemoRole) {
        setAddRoleButton(false);
        setRoles((prev) => ([...prev, role]));
    }


    function modifyRole(id: number, role: DemoRole, isDefault: boolean) {
        console.log("new role id", id);
        setAddRoleButton(!addRoleButton);
        if (isDefault) {
            setDefaultRole(role);
        }
        setRoles((prev) => ([...prev.filter(elem => elem.id !== id)]));
        setRoles((prev) => ([...prev, role]));
        setModify(false);
    }

    function deleteRole(key: string) {
        setRoles((prev) => ([...prev.filter(elem => elem.name !== key)]));
    }

    const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleInputDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    function errorHandler() {
        if (name && name?.length <= 3) {
            setErrors((prev) => ({...prev, nameError: true, nameMessage: "Should be more than 3 symbols"}));
        } else if (name && name.length > 50) {
            setErrors((prev) => ({...prev, nameError: true, nameMessage: "Should be less than 50 symbols"}));
        } else {
            setErrors((prev) => ({...prev, nameError: false, nameMessage: ""}));
        }

        if (description && description?.length <= 3) {
            setErrors((prev) => ({
                ...prev,
                descriptionError: true,
                descriptionMessage: "Should be more than 3 symbols"
            }));
        } else if (description && description.length > 50) {
            setErrors((prev) => ({
                ...prev,
                descriptionError: true,
                descriptionMessage: "Should be less than 50 symbols"
            }));
        } else {
            setErrors((prev) => ({...prev, descriptionError: false, descriptionMessage: ""}));
        }
    }

    function handleGetAllUsers() {
        coreRequest()
            .get("users")
            .then((response) => {
                setUsers(response.body);
            })
            .catch(err => {
                const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
                errorHandler
                    .on(401, () => {
                        logout();
                    })
                    .handle(err);
            });
    }

    function handleGetOwner() {
        //TODO if user is empty redirect to login page
        const user = getUser();
        coreRequest()
            .get(`users/${user?.id}`)
            .then((response) => {
                setOwner(response.body);
            })
            .catch(err => {
                const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
                errorHandler
                    .on(401, () => {
                        logout();
                    })
                    .handle(err);
            });
    }

    function createOrg() {
        console.log("roles", roles);
        const userIds = members.map((member) => member.id);
        const filteredRoles = roles.filter(elem => elem.id !== defaultRole.id);
        const sentRoles = filteredRoles.map((elem) => {
            const {id, ...obj} = elem;
            return obj;
        });
        const {id, ...defaultRoleToSent} = defaultRole;
        console.log(sentRoles);
        coreRequest()
            .post("organizations")
            .send({
                name: name,
                description: description,
                userIds: userIds,
                roles: sentRoles,
                defaultRole: defaultRoleToSent
            })
            .then((response) => {
                enqueueSuccessSnackbar("Successfully created");
                changeRoute({page: "organization", id: response.body.organizationId});
            })
            .catch(err => {
                const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
                errorHandler
                    .on(400, "Invalid input")
                    .on(401, () => {
                        logout();
                    })
                    .on(409, "Organization with this name already exists")
                    .handle(err);
            });
    }

    useEffect(() => {
        handleGetAllUsers();
        handleGetOwner();
    }, []);

    info = (
        <React.Fragment>
            <Grid item xs={12} md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Organization name"
                    onChange={handleInputName}
                    error={errors.nameError}
                    helperText={errors.nameMessage}
                    onBlur={errorHandler}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Description"
                    onChange={handleInputDescription}
                    error={errors.descriptionError}
                    helperText={errors.descriptionMessage}
                    onBlur={errorHandler}
                />
            </Grid>
        </React.Fragment>
    );

    return (
        <Grid container spacing={2} style={style} className={clsx(classes.container, classes.sidePaddings, className)}>
            <Grid container justify="center" direction="row" alignItems="center">
                <IconButton><Avatar variant="circular" src="/broken-image.jpg" className={classes.avatar}/></IconButton>
            </Grid>
            {info}
            <Grid item xs={12}>
                <List>
                    <ListItem className={clsx(classes.sidePaddingsNone, classes.listHeader)}>
                        <ListItemText primary="Roles" primaryTypographyProps={{variant: "h6"}}/>
                        <IconButton
                            onClick={() => {
                                setAddRoleButton(!addRoleButton);
                                setRoleToModify(undefined);
                            }}
                        >
                            <AddIcon/>
                        </IconButton>
                    </ListItem>
                    <Divider/>
                    {roles.map((item) => {
                        return (
                            <ListItem key={item.id}>
                                <ListItemAvatar style={{minWidth: 16}}>
                                    <Box className={classes.colorBar}
                                         style={{backgroundColor: `#${item.color}`}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={item.description}
                                    style={{color: defaultRole.id === item.id ? yellow[700] : undefined}}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        style={{marginRight: theme.spacing(0)}}
                                        onClick={() => {
                                            if (defaultRoleId === item.id) {
                                                setIsDefault(true);
                                            }
                                            setModify(true);
                                            setAddRoleButton(!addRoleButton);
                                            setRoleToModify(item);
                                        }}
                                    >
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => confirm(async () => deleteRole(item.name),
                                            {title: `are you sure to delete role: ${item.name} ?`})}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                    {!roles.length &&
                    <Box className={classes.emptyRolesList}>
                        <Typography variant="body1" align="center">
                            There are no roles. Please be aware that the default role will be created anyway
                        </Typography>
                    </Box>
                    }
                </List>

                <DialogAddRoles
                    open={addRoleButton}
                    onClose={() => {
                        setAddRoleButton(false);
                    }}
                    onExited={() => {
                        setRoleToModify(undefined);
                        setModify(false);
                        setIsDefault(false);
                    }}
                    onAddRole={addRole}
                    role={roleToModify}
                    modify={modify}
                    onModifyRole={modifyRole}
                    isDefault={isDefault}
                />

                <List style={{marginTop: 16}}>
                    <ListItem className={clsx(classes.sidePaddingsNone, classes.listHeader)}>
                        <ListItemText primary={<Typography variant="h6">Members</Typography>}/>
                        <IconButton onClick={() => setAddMemberButton(!addMemberButton)}>
                            <AddIcon/>
                        </IconButton>
                    </ListItem>
                    <Divider className={classes.divider}/>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar/>
                        </ListItemAvatar>
                        <ListItemText primary={owner?.username}/>
                        <ListItemSecondaryAction>
                            <Chip label="Owner"/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {members.map(person => {
                        return (
                            <ListItem key={person.id}>
                                <ListItemAvatar>
                                    <Avatar/>
                                </ListItemAvatar>
                                <ListItemText primary={person.username}/>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        onClick={() => setMembers(prev => [...prev.filter(mem => person.id !== mem.id)])}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>

                <DialogAddUsers
                    open={addMemberButton}
                    onClose={handleCloseDialogAddUser}
                    newUsers={newUsers}
                    availableUsers={availableUsers}
                    orgCreation={true}
                    onNewUserClick={handleNewUsersClick}
                    onAdduser={handleAddUser}
                />
            </Grid>

            <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end"}}>
                <Grid item xs={3}>
                    <Button fullWidth onClick={createOrg}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
});

export default withStyles(styles)(CreateOrganizationPageView);