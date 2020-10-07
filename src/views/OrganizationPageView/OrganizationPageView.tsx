/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 17:19
 * All rights reserved.
 */

import React, {Ref} from "react";
import {
    Avatar,
    Box,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select,
    withStyles
} from "@material-ui/core";
import styles from "./styles";
import DataTextField from "../../components/DataTextField";
import TopicWithButton from "./LocalComponents/TopicWithButton";
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import PluginComponent from "./LocalComponents/PluginComponent";
import Stylable from "../../interfaces/Stylable";

/**
 * OrganizationPageViewPropsStyled - interface for OrganizationPageView function
 * @interface
 * @author Nikita Nesterov
 */
interface OrganizationPageViewPropsStyled extends Stylable {

}

const OrganizationPageView = React.forwardRef((props: OrganizationPageViewPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const [users, setUsers] = React.useState <any>([
        {name: "Danil", role: "admin", id: 1, department: "Pathfinder"},
        {name: "Andriy", role: "moderator", id: 2, department: "Gachi"},
        {name: "Nikita", role: "member", id: 3, department: "Gutsul"},
    ]);

    // const users =[
    //
    // ]

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
        user.role = event.target.value;
        setUsers(newUsers);
    };


    return (
        <Box>
            <Box className={classes.container}>
                <Grid container className={classes.firstLine}>
                    <Grid item xs={8}>
                        <Box>
                            <Grid container spacing={2} className={classes.nameDescription}>
                                <Grid item xs={6}>
                                    <DataTextField label="Organization name" children="Blizzard entertainment"/>
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

            <TopicWithButton children="Members"/>
            <Grid container className={classes.firstLine} spacing={0}>
                {users.map((user: any, key: number) => {
                    //console.log(user);
                    return (
                        <Grid item xs={10} key={key}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src="https://cdn.sportclub.ru/assets/2019-09-20/n97c311rvb.jpg"/>
                                </ListItemAvatar>
                                <ListItemText primary={user.name} secondary={user.department}/>
                                <ListItemSecondaryAction>
                                    <Select
                                        // value={state.role}
                                        style={{width: 100}}
                                        onChange={handleChange}
                                        name={user.name} // why id?
                                        // inputProps={{
                                        //     role: 'member',
                                        //     id: 'role-native-simple',
                                        // }}
                                        value={user.role}
                                        label="Admin"
                                        className={classes.selectFieldStyle}
                                    >
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"member"}>Member</MenuItem>
                                        <MenuItem value={"moderator"}>Moderator</MenuItem>
                                    </Select>
                                    <IconButton>
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
    );
})

export default withStyles(styles)(OrganizationPageView)