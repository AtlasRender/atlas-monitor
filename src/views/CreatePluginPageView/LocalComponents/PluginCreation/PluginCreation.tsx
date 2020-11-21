/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import React, {Ref, useContext, useEffect, useState} from "react";
import {Button, Grid, List, ListItem, withStyles,} from "@material-ui/core";
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

interface ValidationErrors {
    "noInputError": boolean;
    "nameError": boolean;
    "niceNameError": boolean;
    "minError": boolean;
    "maxError": boolean;
    "defaultError": boolean;
}

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

    const [errors, setErrors] = useState<ValidationErrors>({
        "noInputError": true,
        "nameError": false,
        "niceNameError": false,
        "minError": false,
        "maxError": false,
        "defaultError": false,
    });
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
        setErrors({
            "noInputError": true,
            "nameError": false,
            "niceNameError": false,
            "minError": false,
            "maxError": false,
            "defaultError": false,
        });
    }, [open]);

    const handleInputField = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (name === "min" || name === "max") {
            setAddField(prev => (prev && {...prev, [name]: +event.target.value}));
        } else {
            setAddField(prev => (prev && {...prev, [name]: event.target.value}));
        }
    };

    const handleSetFieldType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFieldType(event.target.value as string);
    };

    function handleOnClose() {
        onClose();
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

    function handleValidation(event: React.FocusEvent<HTMLInputElement>) {
        setErrors(prev => ({
            ...prev, "noInputError": false
        }));
        if (event.target.name === "name") {
            if (!addField.name.match(/^[a-zA-Z]+$/) ||
                !addField.name || addField.name.length < 3 ||
                addField.name.length > 50 ||
                pluginFields.find(field => field.name === addField.name)
            ) {
                setErrors(prev => ({
                    ...prev, "nameError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "nameError": false
                }));
            }
        } else if (event.target.name === "niceName") {
            if (!addField.niceName.match(/^[a-zA-Z]+$/) || !addField.niceName || addField.niceName.length < 3 || addField.niceName.length > 50) {
                setErrors(prev => ({
                    ...prev, "niceNameError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "niceNameError": false
                }));
            }
        } else if (event.target.name === "min") {
            if (!addField.min || addField.min < 0) {
                setErrors(prev => ({
                    ...prev, "minError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "minError": false
                }));
            }
        } else if (event.target.name === "max") {
            if (!addField.min || addField.min < 0) {
                setErrors(prev => ({
                    ...prev, "maxError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "maxError": false
                }));
            }
        } else if (event.target.name === "default") {
            if (!addField.default.match(/^[a-zA-Z]+$/) || !addField.default || addField.default.length < 3 || addField.default.length > 50) {
                setErrors(prev => ({
                    ...prev, "defaultError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "defaultError": false
                }));
            }
        }
        if (event.target.name === "max" || event.target.name === "min") {
            if (addField.min > addField.max) {
                setErrors(prev => ({
                    ...prev, "maxError": true, "minError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "maxError": false, "minError": false
                }));
            }
        }
    }


   console.log(context.pluginFields);

    function showPluginFields(array: GroupField) {
        return (
            array.nested.map((folder, index) => {

                if (folder instanceof GroupField) {
                    return (
                        <Folder id={folder.id}>
                            {showPluginFields(folder)}
                        </Folder>
                    );

                }

                return (
                    <DragableListItem
                        key={folder.id}
                        field={folder}
                        index={index}
                        moveCard={move}
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
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={4}>
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


                        <Grid item xs={12} md={4} style={{padding: 16}}>
                            <Grid container className={classes.firstLine}>
                                <Grid item xs={12}>
                                    <Folder className={classes.rootFolder} id={rootFolder.id}>
                                        {showPluginFields(rootFolder)}
                                    </Folder>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} md={4}>
                            <List>
                                <ListItem style={{padding: 0}}>
                                    <Grid container>
                                        {fieldType === "divider" &&
                                        <Grid item xs={12} className={classes.gridPadding}>
                                            <TextField
                                                error={errors.nameError}
                                                variant="standard"
                                                required
                                                fullWidth
                                                name="name"
                                                label="Name"
                                                defaultValue={addField.name}
                                                onChange={handleInputField("name")}
                                                onBlur={handleValidation}
                                            />
                                        </Grid>
                                        }
                                        {fieldType === "inputField" &&
                                        <React.Fragment>
                                            <Grid item xs={12} className={classes.gridPadding}>
                                                <TextField
                                                    error={errors.nameError}
                                                    variant="standard"
                                                    required
                                                    fullWidth
                                                    name="name"
                                                    label="Name"
                                                    defaultValue={addField.name}
                                                    onChange={handleInputField("name")}
                                                    onBlur={handleValidation}
                                                />
                                            </Grid>

                                            <Grid item xs={12} className={classes.gridPadding}>
                                                <TextField
                                                    error={errors.niceNameError}
                                                    variant="standard"
                                                    required
                                                    fullWidth
                                                    name="niceName"
                                                    label="Displayable name"
                                                    defaultValue={addField.niceName}
                                                    onChange={handleInputField("niceName")}
                                                    onBlur={handleValidation}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.gridPadding}>
                                                <TextField
                                                    error={errors.minError}
                                                    type="number"
                                                    variant="standard"
                                                    required
                                                    fullWidth
                                                    name="min"
                                                    label="Min value"
                                                    defaultValue={addField.min}
                                                    onChange={handleInputField("min")}
                                                    onBlur={handleValidation}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.gridPadding}>
                                                <TextField
                                                    error={errors.maxError}
                                                    type="number"
                                                    variant="standard"
                                                    required
                                                    fullWidth
                                                    name="max"
                                                    label="Max value"
                                                    defaultValue={addField.max}
                                                    onChange={handleInputField("max")}
                                                    onBlur={handleValidation}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.gridPadding}>
                                                <TextField
                                                    error={errors.defaultError}
                                                    variant="standard"
                                                    required
                                                    fullWidth
                                                    name="default"
                                                    label="Default Value"
                                                    defaultValue={addField.default}
                                                    onChange={handleInputField("default")}
                                                    onBlur={handleValidation}
                                                />
                                            </Grid>
                                        </React.Fragment>
                                        }

                                    </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth onClick={() => {
                            }}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </React.Fragment>
    );
});

export default withStyles(styles)(PluginCreation);