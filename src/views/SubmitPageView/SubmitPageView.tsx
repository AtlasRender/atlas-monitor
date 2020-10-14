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
    ListItemText,
    ListItemSecondaryAction,
    List,
    Button,
    Chip,
    useMediaQuery,
    InputLabel,
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
        console.info("You clicked the delete icon.");
    };

    const matches = useMediaQuery("(min-width:625px)");
    let submitInfo;
    let renderSettings;
    let plugin;
    let submitButton;
    if (matches) {
        submitInfo = (
            <React.Fragment>
                <Grid item xs={4}>
                    <TextField fullWidth label="Work title"/>
                </Grid>
                <Grid item xs={3}>
                    <TextField fullWidth label="Submitter"/>
                </Grid>
                <Grid item xs={3}>
                    <Select value="pathfinder monitor" fullWidth>
                        <MenuItem value="pathfinder monitor">Pathfinder Monitor</MenuItem>
                        <MenuItem value="pathfinder core">Pathfinder Core</MenuItem>
                        <MenuItem value="pathfinder slave">Pathfinder Slave</MenuItem>
                    </Select>
                </Grid>
            </React.Fragment>
        );
        renderSettings = (
            <Grid item xs={10} className={classes.flexItem}>
                <Grid item xs={2}>
                    <TextField fullWidth label="Frame start"/>
                </Grid>
                <Grid item xs={2}>
                    <TextField fullWidth label="Frame end"/>
                </Grid>
                <Grid item xs={1}>
                    <TextField fullWidth label="Step"/>
                </Grid>
                <Grid item xs={2}>
                    <TextField fullWidth label="Start from"/>
                </Grid>
                <Grid item xs={2}>
                    <TextField fullWidth label="Renum step"/>
                </Grid>
                <Grid item xs={1}>
                    <TextField fullWidth label="Priority"/>
                </Grid>
            </Grid>
        );
        plugin = (
            <React.Fragment>
                <Grid item xs={8} className={classes.flexItem}>
                    <Select value={1} fullWidth>
                        <MenuItem value={1}>
                            Arnold Shwarznegger and Silvestr s talonom
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={2}>
                    <Select value="1.01" fullWidth>
                        <MenuItem value="1.01">
                            1.01
                        </MenuItem>
                    </Select>
                </Grid>
            </React.Fragment>
        );
        submitButton=(
            <React.Fragment>
                <Grid item xs={10} className={classes.flexItem}>
                    <Grid item xs={8}/>
                    <Grid item xs={2}>
                        <Button fullWidth variant="contained" className={classes.submitButton}>Submit</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        submitInfo = (
            <React.Fragment>
                <Grid item xs={10}>
                    <TextField fullWidth label="Work title"/>
                </Grid>
                <Grid item xs={10}>
                    <TextField fullWidth label="Submitter"/>
                </Grid>
                <Grid item xs={10}>
                    <Select value="pathfinder monitor" fullWidth className={classes.selectMargin}>
                        <MenuItem value="pathfinder monitor">Pathfinder Monitor</MenuItem>
                        <MenuItem value="pathfinder core">Pathfinder Core</MenuItem>
                        <MenuItem value="pathfinder slave">Pathfinder Slave</MenuItem>
                    </Select>
                </Grid>
            </React.Fragment>
        );
        renderSettings = (
            <React.Fragment>
                <Grid item xs={5}>
                    <TextField fullWidth label="Frame start"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Frame end"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Step"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Start from"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Renum step"/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth label="Priority"/>
                </Grid>
            </React.Fragment>
        );
        plugin = (
            <React.Fragment>
                <Grid item xs={10} className={classes.flexItem}>
                    <Select value={1} fullWidth>
                        <MenuItem value={1}>
                            Arnold Shwarznegger and Silvestr s talonom
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={10}>
                    <Select value="1.01" fullWidth>
                        <MenuItem value="1.01">
                            1.01
                        </MenuItem>
                    </Select>
                </Grid>
            </React.Fragment>
        );
        submitButton=(
            <React.Fragment>
                <Grid item xs={10} className={classes.flexItem}>
                    <Button fullWidth variant="contained" className={classes.submitButton}>Submit</Button>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <Box>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={10}>
                    <Typography variant="h6">Submit info</Typography>
                </Grid>
                {submitInfo}
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
                {renderSettings}
                <Grid item xs={4}>
                    <Button variant="contained" fullWidth className={classes.buttonAdd}>ADD</Button>
                </Grid>
                <Grid item xs={10} className={classes.flexItem}>
                    <Box>
                        <Chip label="1000-1001 2 save as 10 Priority:1" onDelete={handleDelete}
                              className={classes.chipStyle}/>
                        <Chip label="1002-1279 1 save as 1 Priority:3" onDelete={handleDelete}
                              className={classes.chipStyle}/>
                        <Chip label="1279-1400 5 save as 1 Priority:2" onDelete={handleDelete}
                              className={classes.chipStyle}/>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6">Plugin</Typography>
                </Grid>
                {plugin}
                {submitButton}
            </Grid>
        </Box>
    );
});

export default withStyles(styles)(SubmitPageView);