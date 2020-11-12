/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    withStyles,
} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import BasicPluginField from "../../../../entities/BasicPluginField";
import InputField from "../../../../entities/InputField";

interface ValidationErrors {
    "noInputError": boolean;
    "nameError": boolean;
    "niceNameError": boolean;
    "minError": boolean;
    "maxError": boolean;
    "defaultError": boolean;
}

interface DialogPluginProps extends Stylable {
    open: boolean;
    pluginFields: (BasicPluginField | InputField)[];

    onClose(): void;

    onAddField(event: any, field: BasicPluginField | InputField): void;
}


const DialogPlugin = React.forwardRef((props: DialogPluginProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        onClose,
        onAddField,
        pluginFields,
    } = props;


    const [errors, setErrors] = useState<ValidationErrors>({
        "noInputError": true,
        "nameError": false,
        "niceNameError": false,
        "minError": false,
        "maxError": false,
        "defaultError": false,
    });
    const [fieldType, setFieldType] = useState("inputField");
    const [addField, setAddField] = useState({
        name: "",
        niceName: "",
        min: 1,
        max: 255,
        default: ""
    });

    function handleSetDefault() {
        setAddField({
            name: "",
            niceName: "",
            min: 1,
            max: 255,
            default: ""
        });
        setErrors({
            "noInputError": true,
            "nameError": false,
            "niceNameError": false,
            "minError": false,
            "maxError": false,
            "defaultError": false,
        });
    }

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
        handleSetDefault();
    };

    function handleOnClose() {
        onClose();
        handleSetDefault();
    }

    function handleAddFiled(event: any) {
        if (!errors.noInputError &&
            !errors.nameError &&
            !errors.niceNameError &&
            !errors.minError &&
            !errors.maxError &&
            !errors.defaultError) {
            if (fieldType === "inputField") {
                onAddField(event, new InputField(addField));
                handleSetDefault();
            } else if (fieldType === "divider") {
                onAddField(event, new BasicPluginField(addField));
                handleSetDefault();
            }
        }
    }

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


    return (
        <Dialog
            open={open}
            onClose={handleOnClose}
        >
            <DialogTitle className={classes.dialogRoles}>
                Add new plugin field
            </DialogTitle>
            <Divider/>

            <List className={classes.dialogSize}>
                <ListItem>
                    <Grid container>
                        <Grid item xs={12} className={classes.gridPadding}>
                            <FormControl fullWidth>
                                <InputLabel>
                                    Plugin Field
                                </InputLabel>
                                <Select
                                    value={fieldType}
                                    onChange={handleSetFieldType}
                                >
                                    <MenuItem value="inputField">Input Field</MenuItem>
                                    <MenuItem value="divider">Divider</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
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
                        <Button
                            fullWidth
                            onClick={handleAddFiled}
                        >
                            Add field
                        </Button>
                    </Grid>
                </ListItem>
            </List>
        </Dialog>
    );
});

export default withStyles(styles)(DialogPlugin);