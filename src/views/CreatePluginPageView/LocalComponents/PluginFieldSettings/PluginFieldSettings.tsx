/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 24.11.2020, 18:23
 * All rights reserved.
 */

import Stylable from "../../../../interfaces/Stylable";
import React, {Ref, useContext, useState} from "react";
import {Grid, List, ListItem, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styles from "../PluginCreation/styles";
import BasicPluginField from "../../../../entities/BasicPluginField";
import IntegerField from "../../../../entities/IntegerField";
import {PluginContext} from "../../CreatePluginPageView";

interface ValidationErrors {
    "noInputError": boolean;
    "nameError": boolean;
    "niceNameError": boolean;
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
        "niceNameError": false,
        "minError": false,
        "maxError": false,
        "defaultError": false,
    });

    // console.log(index);

    const handleInputField = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (pluginField instanceof IntegerField) {
            context.handleEditPluginField(new IntegerField({
                type: pluginField.type,
                name: name === "name" ? event.target.value : pluginField.name,
                label: name === "label" ? event.target.value : pluginField.label,
                min: name === "min" ? +event.target.value : pluginField.min,
                max: name === "max" ? +event.target.value : pluginField.max,
                default: name === "default" ? event.target.value : pluginField.default,
                id: pluginField.id,
            }), index);
            // context.handleDeletePluginField(new IntegerField({
            //     type: pluginField.type,
            //     name: name === "name" ? event.target.value : pluginField.name,
            //     label: name === "label" ? event.target.value : pluginField.label,
            //     min: name === "min" ? +event.target.value : pluginField.min,
            //     max: name === "max" ? +event.target.value : pluginField.max,
            //     default: name === "default" ? event.target.value : pluginField.default,
            //     id: pluginField.id,
            // }));
            // context.handleAddPluginField(new IntegerField({
            //     type: pluginField.type,
            //     name: name === "name" ? event.target.value : pluginField.name,
            //     label: name === "label" ? event.target.value : pluginField.label,
            //     min: name === "min" ? +event.target.value : pluginField.min,
            //     max: name === "max" ? +event.target.value : pluginField.max,
            //     default: name === "default" ? event.target.value : pluginField.default,
            //     id: pluginField.id,
            // }), index);
        }
    };

    function handleValidation(event: React.FocusEvent<HTMLInputElement>) {
        setErrors(prev => ({
            ...prev, "noInputError": false
        }));
        if (event.target.name === "name") {
            if (!pluginField.name.match(/^[a-zA-Z]+$/) || !pluginField.name || pluginField.name.length < 3 || pluginField.name.length > 50) {
                setErrors(prev => ({
                    ...prev, "nameError": true
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "nameError": false
                }));
            }
        }
    }


    return (
        <List>
            <ListItem style={{padding: 0}}>

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
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridPadding}>
                        <TextField
                            error={errors.niceNameError}
                            variant="standard"
                            required
                            fullWidth
                            name="label"
                            label="Label"
                            value={pluginField.label}
                            onChange={handleInputField("label")}
                            onBlur={handleValidation}
                        />
                    </Grid>
                    {pluginField instanceof IntegerField &&
                    <React.Fragment>
                        <Grid item xs={12} className={classes.gridPadding}>
                            <TextField
                                error={errors.minError}
                                type="number"
                                variant="standard"
                                required
                                fullWidth
                                name="min"
                                label="Min value"
                                value={pluginField.min}
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
                                value={pluginField.max}
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
                                value={pluginField.default}
                                onChange={handleInputField("default")}
                                onBlur={handleValidation}
                            />
                        </Grid>
                    </React.Fragment>
                    }
                </Grid>

            </ListItem>
        </List>
    );
});

export default withStyles(styles)(PluginFieldSettings);