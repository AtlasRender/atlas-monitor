/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 24.11.2020, 18:23
 * All rights reserved.
 */

import Stylable from "../../../../interfaces/Stylable";
import React, {Ref, useContext, useEffect, useState} from "react";
import {Grid, List, ListItem, Typography, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import BasicPluginField from "../../../../entities/BasicPluginField";
import IntegerField from "../../../../entities/IntegerField";
import {PluginContext} from "../../CreatePluginPageView";
import styles from "./styles";
import GroupField from "../../../../entities/GroupField";
import SeparatorField from "../../../../entities/SeparatorField";
import StringField from "../../../../entities/StringField";

interface ValidationErrors {
    "noInputError": boolean;
    "nameError": boolean;
    "labelError": boolean;
    "minError": boolean;
    "maxError": boolean;
    "defaultError": boolean;
}

interface PluginFieldSettingsProps extends Stylable {
    pluginField: BasicPluginField;
    index: number;
}


const PluginFieldSettings = React.forwardRef((props: PluginFieldSettingsProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        pluginField,
        index
    } = props;

    const context = useContext(PluginContext);


    const [errors, setErrors] = useState<ValidationErrors>({
        "noInputError": true,
        "nameError": false,
        "labelError": false,
        "minError": false,
        "maxError": false,
        "defaultError": false,
    });


    useEffect(() => {
        setErrors({
            "noInputError": true,
            "nameError": false,
            "labelError": false,
            "minError": false,
            "maxError": false,
            "defaultError": false,
        });
    }, [pluginField]);


    const handleInputField = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();

        let targetValue;

        if(!event.target.value) {
            targetValue = null;
        } else {
            targetValue = event.target.value;
        }

        if (pluginField instanceof IntegerField) {
            context.handleEditPluginField(new IntegerField({
                type: pluginField.type,
                name: name === "name" ? targetValue : pluginField.name,
                label: name === "label" ? targetValue : pluginField.label,
                min: name === "min" ? (targetValue ? +targetValue : targetValue) : pluginField.min,
                max: name === "max" ? (targetValue ? +targetValue : targetValue) : pluginField.max,
                default: name === "default" ? (targetValue ? +targetValue : targetValue) : pluginField.default,
                id: pluginField.id,
            }), index);
        } else if (pluginField instanceof GroupField) {
            context.handleEditPluginField(new GroupField({
                type: pluginField.type,
                name: name === "name" ? targetValue : pluginField.name,
                label: name === "label" ? targetValue : pluginField.label,
                id: pluginField.id,
            }), index);
        } else if (pluginField instanceof SeparatorField) {
            context.handleEditPluginField(new SeparatorField({
                type: pluginField.type,
                name: name === "name" ? targetValue : pluginField.name,
                label: name === "label" ? targetValue : pluginField.label,
                id: pluginField.id,
            }), index);
        } else if (pluginField instanceof StringField) {
            context.handleEditPluginField(new StringField({
                type: pluginField.type,
                name: name === "name" ? targetValue : pluginField.name,
                label: name === "label" ? targetValue : pluginField.label,
                min: name === "min" ? (targetValue ? +targetValue : targetValue) : pluginField.min,
                max: name === "max" ? (targetValue ? +targetValue : targetValue) : pluginField.max,
                default: name === "default" ? targetValue : pluginField.default,
                id: pluginField.id,
            }), index);
        }
    };

    function handleValidation(event: React.FocusEvent<HTMLInputElement>) {
        setErrors(prev => ({
            ...prev, "noInputError": false
        }));
        if (event.target.name === "name") {
            if (!pluginField.name || pluginField.name.length < 3 || pluginField.name.length > 50 || context.pluginFields.filter(field => field.name === pluginField.name).length > 1) {
                setErrors(prev => ({
                    ...prev, "nameError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "nameError": false
                }));
            }
        } else if (event.target.name === "label") {
            if (!pluginField.label || pluginField.label.length < 3 || pluginField.label.length > 50) {
                setErrors(prev => ({
                    ...prev, "labelError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "labelError": false
                }));
            }
        }
        if (pluginField instanceof IntegerField || pluginField instanceof StringField) {
            if (event.target.name === "min") {
                if (!pluginField.min || pluginField.min < 0) {
                    setErrors(prev => ({
                        ...prev, "minError": true
                    }));
                } else {
                    setErrors(prev => ({
                        ...prev, "minError": false
                    }));
                }
            } else if (event.target.name === "max") {
                if (!pluginField.max || pluginField.max < 0) {
                    setErrors(prev => ({
                        ...prev, "maxError": true
                    }));
                } else {
                    setErrors(prev => ({
                        ...prev, "maxError": false
                    }));
                }
            } else if (event.target.name === "default") {
                // TODO: lookup logic and set up parenthesis (skobo4ki)
                if (pluginField instanceof StringField) {
                    if (!pluginField.default || pluginField.min && pluginField.default.length < pluginField.min || pluginField.max && pluginField.default.length > pluginField.max) {
                        setErrors(prev => ({
                            ...prev, "defaultError": true
                        }));
                    } else {
                        setErrors(prev => ({
                            ...prev, "defaultError": false
                        }));
                    }
                    if (!pluginField.default) {
                        setErrors(prev => ({
                            ...prev, "defaultError": false
                        }));
                    }
                } else if(pluginField instanceof IntegerField)
                {
                    if (!pluginField.default || pluginField.min && pluginField.default < pluginField.min || pluginField.max && pluginField.default > pluginField.max) {
                        setErrors(prev => ({
                            ...prev, "defaultError": true
                        }));
                    } else {
                        setErrors(prev => ({
                            ...prev, "defaultError": false
                        }));
                    }
                    if (!pluginField.default) {
                        setErrors(prev => ({
                            ...prev, "defaultError": false
                        }));
                    }
                }

            }
            if (event.target.name === "min" || event.target.name === "max") {
                if (pluginField.min && pluginField.max) {
                    if (pluginField.min > pluginField.max) {
                        setErrors(prev => ({
                            ...prev, "maxError": true, "minError": true,
                        }));
                    } else {
                        setErrors(prev => ({
                            ...prev, "maxError": false, "minError": false,
                        }));
                    }
                } else {
                    setErrors(prev => ({
                        ...prev, "maxError": false, "minError": false,
                    }));
                }
            }
        }
    }


    return (
        pluginField ?
            <List>
                <ListItem className={classes.listPadding}>

                    <Grid container>
                        <Grid item xs={12} className={classes.gridPadding}>
                            <TextField
                                error={errors.nameError}
                                variant="standard"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                value={pluginField.name}
                                onChange={handleInputField("name")}
                                onBlur={handleValidation}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridPadding}>
                            <TextField
                                error={errors.labelError}
                                variant="standard"
                                required
                                fullWidth
                                name="label"
                                label="Label"
                                value={pluginField.label}
                                onChange={handleInputField("label")}
                                onBlur={handleValidation}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Grid>
                        {(pluginField instanceof IntegerField || pluginField instanceof StringField) &&
                        <React.Fragment>
                            <Grid item xs={12} className={classes.gridPadding}>
                                <TextField
                                    error={errors.minError}
                                    type="number"
                                    variant="standard"
                                    fullWidth
                                    name="min"
                                    label="Min value"
                                    value={pluginField.min || null}
                                    onChange={handleInputField("min")}
                                    onBlur={handleValidation}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridPadding}>
                                <TextField
                                    error={errors.maxError}
                                    type="number"
                                    variant="standard"
                                    fullWidth
                                    name="max"
                                    label="Max value"
                                    value={pluginField.max || null}
                                    onChange={handleInputField("max")}
                                    onBlur={handleValidation}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridPadding}>
                                <TextField
                                    error={errors.defaultError}
                                    type={pluginField instanceof IntegerField ? "number" : "string"}
                                    variant="standard"
                                    fullWidth
                                    name="default"
                                    label="Default Value"
                                    value={pluginField.default || null}
                                    onChange={handleInputField("default")}
                                    onBlur={handleValidation}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                        </React.Fragment>
                        }
                    </Grid>

                </ListItem>
            </List>
            :
            <Typography variant="h6" className={classes.typographyText}>
                Nothing selected
            </Typography>
    );
});

export default withStyles(styles)(PluginFieldSettings);