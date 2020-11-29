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
    Grid,
    withStyles,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction, Typography,
    Divider, ListItemIcon, ListItemAvatar,
    Select, useMediaQuery, useTheme, Dialog, DialogTitle, Button, Chip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BuildIcon from "@material-ui/icons/Build";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";
import DialogAddRoles from "../OrganizationPageView/LocalComponents/DialogAddRoles/DialogAddRoles";
import {coreRequest} from "../../utils/Rest";
import Role from "../../interfaces/Role";
import {useChangeRoute} from "routing-manager";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useConfirm from "../../hooks/useConfirm";
import UserData from "../../interfaces/UserData";
import useCoreRequest from "../../hooks/useCoreRequest";
import useAuth from "../../hooks/useAuth";
import User from "../../interfaces/User";


interface CreateOrganizationPageProps extends Stylable {

}

const CreateOrganizationPageView = React.forwardRef((props: CreateOrganizationPageProps, ref: Ref<any>) => {
    const {
        style,
        className,
        classes,
    } = props;

    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const {getRouteParams} = useChangeRoute();
    const coreRequest = useCoreRequest();
    const {getUser} = useAuth();
    const confirm = useConfirm();

    const [addRoleButton, setAddRoleButton] = useState<boolean>(false);
    const [modify, setModify] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [errors, setErrors] = useState({
        nameError:false,
        nameMessage:"",
        descriptionError:false,
        descriptionMessage:"",
    })
    const [owner, setOwner] = useState<UserData>();
    const [roles, setRoles] = useState<Role[]>([]);
    const [roleToModify, setRoleToModify] = useState<Role>();
    const [users, setUsers] = useState<UserData[]>([]);
    const [members, setMembers] = useState<UserData[]>([]);
    const [addMemberButton, setAddMemberButton] = useState<boolean>(false);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    let info;

    function addRole(role: Role) {
        setAddRoleButton(!addRoleButton);
        setRoles((prev) => ([...prev, role]));
    }
    console.log(roles);
    function modifyRole(id: number, role: Role){
        setAddRoleButton(!addRoleButton);
        setRoles((prev) => ([...prev.filter(elem => elem.id != id)]));
        setRoles((prev)=>([...prev, role]));
        setModify(false);
    }

    function deleteRole(key: string) {
        setRoles((prev) => ([...prev.filter(elem => elem.name != key)]));
    }

    const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(name);
    }

    const handleInputDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        console.log(description);
    }

    function errorHandler(){
        if (name && name?.length <= 3) {
            setErrors((prev)=>({...prev, nameError: true, nameMessage: "Should be more than 3 symbols"}));
        } else if(name && name.length > 50) {
            setErrors((prev)=>({...prev, nameError: true, nameMessage: "Should be less than 50 symbols"}));
        }
        else{
            setErrors((prev)=>({...prev, nameError:false, nameMessage:""}));
        }

        if (description && description?.length <= 3) {
            setErrors((prev)=>({...prev, descriptionError: true, descriptionMessage: "Should be more than 3 symbols"}));
        } else if(description && description.length > 50) {
            setErrors((prev)=>({...prev, descriptionError: true, descriptionMessage: "Should be less than 50 symbols"}));
        }
        else{
            setErrors((prev)=>({...prev, descriptionError:false, descriptionMessage:""}));
        }
    }

    function handleGetAllUsers() {
        coreRequest()
            .get("users")
            .then((response) => {
                setUsers(response.body);
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("Cant get users");
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
                //TODO handle errors
                enqueueErrorSnackbar("Who are you?");
            });
    }

    function createOrg() {
        coreRequest()
            .post("organizations")
            .send({name: name, description: description, users: members})
            .then()
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("couldn't create org");
            })
    }

    useEffect(() => {
        handleGetAllUsers();
        handleGetOwner();
    }, [])

    if (matches) {
        info = (
            <React.Fragment>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
    } else {
        info = (
            <React.Fragment>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        required fullWidth
                        label="Organization name"
                        error={errors.nameError}
                        helperText={errors.nameMessage}
                        onBlur={errorHandler}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Description"
                        error={errors.descriptionError}
                        helperText={errors.descriptionMessage}
                        onBlur={errorHandler}
                    />
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <Grid container spacing={2} style={style} className={clsx(classes.container, classes.sidePaddings, className)}>
            <Grid container justify="center" direction="row" alignItems="center">
                <IconButton><Avatar variant="circle" src="/broken-image.jpg" className={classes.avatar}/></IconButton>
            </Grid>
            {info}
            <Grid item xs={12} spacing={2}>
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
                    {console.log(roles)}
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
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        style={{marginRight: theme.spacing(0)}}
                                        onClick={() => {
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
                </List>

                <DialogAddRoles
                    open={addRoleButton}
                    onClose={() => setAddRoleButton(!addRoleButton)}
                    onAddRole={addRole}
                    role={roleToModify}
                    modify={modify}
                    onModifyRole={modifyRole}
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
                                    {/*chips here*/}
                                    <IconButton
                                        onClick={() => setMembers(prev => [...prev.filter(mem => person.id != mem.id)])}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>

                <Dialog
                    open={addMemberButton}
                    onClose={() => setAddMemberButton(!addMemberButton)}
                >
                    <DialogTitle className={classes.container}>
                        <Typography variant="h6" align="center">
                            Add members
                        </Typography>
                    </DialogTitle>
                    <Divider/>
                    <List className={classes.minWidthList}>
                        {users.map((user) => {
                            if(user.id === owner?.id){
                                return;
                            }
                            return (
                                <ListItem key={user.id}>
                                    <ListItemAvatar><Avatar/></ListItemAvatar>
                                    <ListItemText primary={user.username}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => setMembers(prev => [...prev, user])}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Button
                        fullWidth
                        onClick={() => setAddMemberButton(!addMemberButton)}
                    >
                        Close
                    </Button>
                </Dialog>
            </Grid>
            <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end"}}>
                <Grid item xs={3}>
                    <Button fullWidth className={classes.button} onClick={createOrg}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
});

export default withStyles(styles)(CreateOrganizationPageView);