/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import React, {Ref, useContext, useEffect, useState} from "react";
import {Button, Grid, List, ListItem, Typography, withStyles,} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import {PluginContext} from "../../CreatePluginPageView";
import DragableSubject from "../DragableComponents/DragableSubject";
import Folder from "../DragableComponents/Folder";
import DragableListItem from "../DragableListItem/DragableListItem";
import GroupField from "../../../../entities/GroupField";
import IntegerField from "../../../../entities/IntegerField";
import BasicPluginField from "../../../../entities/BasicPluginField";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";
import useCoreRequest from "../../../../hooks/useCoreRequest";
import PluginFieldSettings from "../PluginFieldSettings";
import {PluginSettingsSpec, ValidationError} from "@atlasrender/render-plugin";

interface PluginCreationProps extends Stylable {
    open: boolean;
    pluginFields: BasicPluginField[];

    onClose(): void;

    onAddField(field: BasicPluginField, id: number): void;

    move(dragIndex: number, hoverIndex: number, targetId: number, toId: number): void;

    idGenerator(): number;
}


const PluginCreation = React.forwardRef((props: PluginCreationProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        onClose,
        onAddField,
        pluginFields,
        idGenerator,
        move,
    } = props;

    const context = useContext(PluginContext);
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const coreRequest = useCoreRequest();

    const [fieldIndex, setFieldIndex] = useState(0);
    const [rootFolder, setRootFolder] = useState<GroupField>(new GroupField({id: 0, name: "", type: "folder", label: "", nested: []}));
    const [fieldType, setFieldType] = useState("inputField");
    const [addField, setAddField] = useState({
        name: "",
        niceName: "",
        min: 1,
        max: 255,
        default: "",
        id: 0,
    });

    useEffect(() => {
        const field = context.pluginFields[0];
        if(field instanceof GroupField) {
            setRootFolder(field);
        }
    });

    useEffect(() => {
        setAddField({
            name: "",
            niceName: "",
            min: 1,
            max: 255,
            default: "",
            id: addField.id
        });
    }, [open]);

    function handleCreatePlugin() {
        console.log("hi");
        let validated;
        try{
            validated = new PluginSettingsSpec(pluginFields);
        }catch (error){
            if(error instanceof ValidationError){
                enqueueErrorSnackbar(error.message);
                console.log(error);
            }
            else{
                enqueueErrorSnackbar("Unrecognized error");
            }
            return;
        }
        coreRequest()
            .post("/plugins")
            .send(validated)
            .then(response => {
                console.log("done");
            })
            .catch(err => {
                enqueueErrorSnackbar("Can`t create plugin");
            });
    }

    function getFieldIndex(index: number) {
        setFieldIndex(index);
    }

    // function handleAddFiled(event: any) {
    //     if (!errors.noInputError &&
    //         !errors.nameError &&
    //         !errors.niceNameError &&
    //         !errors.minError &&
    //         !errors.maxError &&
    //         !errors.defaultError) {
    //         if (fieldType === "integer") {
    //             setAddField(prev => ({...prev, id: idGenerator()}));
    //             onAddField(new IntegerField(addField), id);
    //
    //         } else if (fieldType === "folder") {
    //             setAddField(prev => ({...prev, id: idGenerator()}));
    //             onAddField(new GroupField(addField));
    //
    //         }
    //     }
    // }

   console.log(context.pluginFields);

    function showPluginFields(array: BasicPluginField[]) {
        return (
            array.map((folder, index) => {

                // if (folder instanceof GroupField) {
                //     return (
                //         <Folder id={folder.id}>
                //             {showPluginFields(folder)}
                //         </Folder>
                //     );
                //
                // }

                return (
                    <DragableListItem
                        key={folder.id}
                        field={folder}
                        index={index}
                        moveCard={move}
                        getIndex={getFieldIndex}
                        onDelete={context.handleDeletePluginField}
                    />
                );
            })
        );
    }


    return (
        <React.Fragment>
            <List className={classes.dialogSize}>
                <ListItem>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <Grid container>
                                <Grid item xs={12} className={classes.gridPadding}>
                                    <List>
                                        <DragableSubject type="integer"/>
                                        <DragableSubject type="folder"/>
                                        <DragableSubject type="divider"/>
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Grid container className={classes.firstLine}>
                                <Grid item xs={12}>
                                    <Folder className={classes.rootFolder} id={rootFolder.id}>
                                        {showPluginFields(context.pluginFields)}
                                    </Folder>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} md={3}>
                            <PluginFieldSettings pluginField={context.pluginFields[fieldIndex]} index={fieldIndex}/>
                        </Grid>

                        <Button fullWidth onClick={handleCreatePlugin}>
                            Save
                        </Button>

                    </Grid>

                </ListItem>
            </List>
        </React.Fragment>
    );
});

export default withStyles(styles)(PluginCreation);