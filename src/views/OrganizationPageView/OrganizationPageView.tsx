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
    Box, Button,
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

    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const coreRequest = useCoreRequest();
    const [isUserActive, setIsUserActive] = useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [organizationData, setOrganizationData] = useState<Organization | null>(null);
    const [allUsers, setAllUsers] = useState<UserData[] | null>(null);
    const [newUsers, setNewUsers] = useState<number[]>([]);
    const {getRouteParams} = useChangeRoute();
    const {id} = getRouteParams();

    useEffect(() => {
        handleGetOrganization();
        handleGetAllUsers();
    }, []);

    function handleGetOrganization() {
        const organizationId = id;
        coreRequest()
            .get(`organizations/${organizationId}`)
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
        const organizationId = id;
        coreRequest()
            .post(`organizations/${organizationId}/users`)
            .send({userIds: usersToAddId})
            .then(response => {
                handleGetOrganization();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar("No such user");
            })
    }

    function handleRemoveUser(usersToDeleteIds: number[]) {
        const organizationId = id;
        coreRequest()
            .delete(`organizations/${organizationId}/users`)
            .send({userIds: usersToDeleteIds})
            .then(response => {
                handleGetOrganization();
            })
            .catch(err => {
                //TODO handle errors
                enqueueErrorSnackbar(err.message);
            })
    }

    function handleNewUsersClick(newUserId: number) {
        let newUsersArray = newUsers;
        if(newUsers.includes(newUserId)) {
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

    const [users, setUsers] = React.useState <Users[]>([
        {name: "Danil", role: "admin", id: 1, department: "Pathfinder"},
        {name: "Andriy", role: "moderator", id: 2, department: "Gachi"},
        {name: "Nikita", role: "member", id: 3, department: "Gutsul"},
        {name: "Nikita1", role: "member", id: 4, department: "Gutsul"},
    ]);


    const slaves = [
        "Kiev slave",
        "Harkov slave",
        "Lvov slave",
    ]

    /**
     * handleChange - function that handles changes in select field in members list
     * @function
     * @param event
     * @author Nikita Nesterov
     */
    const handleChange = (event: any) => {
        const newUsers = [...users];
        const user = newUsers.find(user => user.id === event.target.name)
        if (user) {
            user.role = event.target.value;
        }
        setUsers(newUsers);
    };

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
                        {organizationData?.users.map((user: UserData, key: number) => {
                            return (
                                <Grid item xs={10} key={key}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg"/>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} secondary={user.email}/>
                                        <ListItemSecondaryAction>
                                            <Select
                                                // value={state.role}
                                                style={{width: 100}}
                                                name={"" + user.id} // why id?
                                                // inputProps={{
                                                //     role: 'member',
                                                //     id: 'role-native-simple',
                                                // }}
                                                value="admin"
                                                label="Admin"
                                                onChange={handleChange}
                                                className={classes.selectFieldStyle}
                                            >
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="member">Member</MenuItem>
                                                <MenuItem value="moderator">Moderator</MenuItem>
                                            </Select>
                                            <IconButton onClick={() => handleRemoveUser([user.id])}>
                                                <SettingsIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
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