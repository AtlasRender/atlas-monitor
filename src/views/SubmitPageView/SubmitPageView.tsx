/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 04.10.2020, 16:10
 * All rights reserved.
 */

import React, {Ref} from "react";
import {
    Box,
    Grid,
    Typography,
    withStyles,
    TextField,
    Select,
    MenuItem,
    IconButton,
    ListItem,
    ListItemText, ListItemSecondaryAction, List, Button, Chip
} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";
import AddIcon from "@material-ui/icons/Add";

/**
 * SubmitPagePropsStyled - interface for SubmitPageView function
 * @interface
 * @author Nikita Nesterov
 */
interface SubmitPagePropsStyled extends Stylable {

}

/**
 * SubmitPageView - function for displaying Submit page
 * @function
 * @author Nikita Nesterov
 */
const SubmitPageView = React.forwardRef((props: SubmitPagePropsStyled, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
    } = props

    // const[obj, setObj] = React.useState();
    // const[render, setRender] = React.useState([]);
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Box>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={10}>
                    <Typography variant="h6">Submit info</Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth id="standard-basic" label="Work title"/>
                </Grid>
                <Grid item xs={3}>
                    <TextField fullWidth id="standard-basic" label="Submitter"/>
                </Grid>
                <Grid item xs={3}>
                    <Select value="pathfinder monitor" fullWidth>
                        <MenuItem value="pathfinder monitor">Pathfinder Monitor</MenuItem>
                        <MenuItem value="pathfinder core">Pathfinder Core</MenuItem>
                        <MenuItem value="pathfinder slave">Pathfinder Slave</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={10} className={classes.flexItem}>
                    <List disablePadding className={classes.fullWidth}>
                        <ListItem disableGutters>
                            <ListItemText
                                primary={<Typography variant="h6">Render settings</Typography>}
                            />
                            <ListItemSecondaryAction>
                                <IconButton><AddIcon/></IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={10} className={classes.flexItem}>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Frame start"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Frame end"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Step"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Save frame as"/>
                    </Grid>
                    <Grid item xs={1}>
                        <TextField fullWidth id="standard-basic" label="Priority"/>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" className={classes.buttonAdd}>ADD</Button>
                    </Grid>
                </Grid>
                <Grid item xs={10} className={classes.flexItem}>
                    <Box >
                        <Chip label="1000-1001 2 save as 10 Priority:1" onDelete={handleDelete}/>
                        <Chip label="1002-1279 1 save as 1 Priority:3" onDelete={handleDelete}/>
                        <Chip label="1279-1400 5 save as 1 Priority:2" onDelete={handleDelete}/>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6">Plugin</Typography>
                </Grid>
                <Grid item xs={10} className={classes.flexItem}>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Samples"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Samples"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Samples"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Samples"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Samples"/>
                    </Grid>
                </Grid>
                <Grid item xs={10} className={classes.flexItem}>
                    <Grid item xs={4}>
                        <TextField fullWidth id="standard-basic" label="Verification"/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="standard-basic" label="Description"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField fullWidth id="standard-basic" label="Samples"/>
                    </Grid>
                </Grid>
                <Grid item xs={10} className={classes.flexItem}>
                    <Grid item xs={8}/>
                    <Grid item xs={2}>
                        <Button fullWidth variant="contained" className={classes.submitButton}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
});

export default withStyles(styles)(SubmitPageView);