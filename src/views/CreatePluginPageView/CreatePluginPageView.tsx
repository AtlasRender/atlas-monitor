/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {
    Avatar,
    Box,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    withStyles
} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import InputField from "../../entities/InputField";
import BasicPluginField from "../../entities/BasicPluginField";
import DialogPlugin from "./LocalComponents/DialogPlugin";
import DeleteIcon from "@material-ui/icons/Delete";

/**
 * CreatePluginPageViewProps - interface for CreatePluginPageView
 * @interface
 * @author Andrii Demchyshyn
 */
interface CreatePluginPageViewProps extends Stylable {

}

/**
 * UserPageView - function for showing create plugin page
 * @function
 * @author Andrii Demchyshyn
 */
const CreatePluginPageView = React.forwardRef((props: CreatePluginPageViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        style,
    } = props;


    const [pluginFields, setPluginFields] = useState<(BasicPluginField | InputField)[]>([]);
    const [isDialogPluginButtonActive, setIsDialogPluginButtonActive] = useState(false);


    function handleAddPluginField(event: any, field: BasicPluginField | InputField) {
        event.persist();
        setIsDialogPluginButtonActive(false);
        setPluginFields(prev => ([...prev, field]));
    }

    function handleDeletePluginField(field: BasicPluginField | InputField) {
        setPluginFields(pluginFields.filter(item => item.name !== field.name));
    }

    function handleSetIsDialogPluginButtonActive() {
        setIsDialogPluginButtonActive(true);
    }


    return (
        <React.Fragment>

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Version"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Note"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{height: 100, background: "grey"}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItem className={classes.paddingNone}>
                            <ListItemText primary="Settings" primaryTypographyProps={{variant: "h6"}}/>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleSetIsDialogPluginButtonActive}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                    </List>
                </Grid>
            </Grid>

            <DialogPlugin
                open={isDialogPluginButtonActive}
                onClose={() => setIsDialogPluginButtonActive(false)}
                onAddField={handleAddPluginField}
            />

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <List>
                        {pluginFields.map(field => {
                            return (
                                field instanceof InputField ?
                                    <ListItem key={field.name}>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={field.default}
                                            secondary={field.niceName}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDeletePluginField(field)}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>

                                    </ListItem>
                                    :
                                    <Divider/>
                            );
                        })}
                    </List>
                </Grid>
            </Grid>

        </React.Fragment>
    );
});

export default withStyles(styles)(CreatePluginPageView);