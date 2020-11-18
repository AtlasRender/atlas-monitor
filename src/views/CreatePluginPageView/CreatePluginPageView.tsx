/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import React, {Ref, useCallback, useState} from "react";
import {
    Divider,
    Grid,
    IconButton,
    ListItem,
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
import PluginCreation from "./LocalComponents/PluginCreation";
import update from "immutability-helper";
import DragableListItem from "./LocalComponents/DragableListItem";
import IdGenerator from "../../utils/IdGenerator";
import FilesLoader from "../../components/FilesLoader";


export const PluginContext = React.createContext<InputField[]>([]);


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

    const [pluginFields, setPluginFields] = useState<InputField[]>([]);
    const [isDialogPluginButtonActive, setIsDialogPluginButtonActive] = useState(false);

    const idGenerator = React.useRef(IdGenerator());
    const getNextId = (): number => idGenerator.current.next().value;

    const move = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragedField = pluginFields[dragIndex];
            setPluginFields(
                update(pluginFields, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragedField],
                    ],
                }),
            );
        },
        [pluginFields],
    );

    function handleAddPluginField(event: any, field: InputField) {
        event.persist();
        setIsDialogPluginButtonActive(false);
        setPluginFields(prev => ([...prev, field]));
    }

    function handleDeletePluginField(field: InputField) {
        setPluginFields(pluginFields.filter(item => item.name !== field.name));
    }

    function handleSetIsDialogPluginButtonActive() {
        setIsDialogPluginButtonActive(true);
    }

    const renderField = (item: InputField, index: number) => {

    };

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
                            <FilesLoader multiple/>
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

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <PluginContext.Provider value={pluginFields}>
                        <PluginCreation
                            open={isDialogPluginButtonActive}
                            onClose={() => setIsDialogPluginButtonActive(false)}
                            onAddField={handleAddPluginField}
                            idGenerator={getNextId}
                            pluginFields={pluginFields}
                        />
                    </PluginContext.Provider>
                </Grid>
            </Grid>

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <List>
                        {pluginFields.map((item, index) => (
                            <DragableListItem
                                key={item.id}
                                field={item}
                                index={index}
                                moveCard={move}
                                onDelete={handleDeletePluginField}
                            />
                        ))}
                    </List>
                </Grid>
            </Grid>

        </React.Fragment>
    );
});

export default withStyles(styles)(CreatePluginPageView);