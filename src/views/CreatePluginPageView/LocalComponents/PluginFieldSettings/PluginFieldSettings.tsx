/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 24.11.2020, 18:23
 * All rights reserved.
 */

import Stylable from "../../../../interfaces/Stylable";
import React, {Ref, useState} from "react";
import {Grid, List, ListItem, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styles from "../PluginCreation/styles";
import BasicPluginField from "../../../../entities/BasicPluginField";
import IntegerField from "../../../../entities/IntegerField";

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
}


const PluginFieldSettings = React.forwardRef((props: PluginFieldSettingsProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        pluginField
    } = props;

    const [errors, setErrors] = useState<ValidationErrors>({
        "noInputError": true,
        "nameError": false,
        "niceNameError": false,
        "minError": false,
        "maxError": false,
        "defaultError": false,
    });

    const [field, setField] = useState(pluginField);

    const handleInputField = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (name === "min" || name === "max") {
            setField(prev => (prev && {...prev, [name]: +event.target.value}));
        } else {
            setField(prev => (prev && {...prev, [name]: event.target.value}));
        }
    };

    function handleValidation(event: React.FocusEvent<HTMLInputElement>) {
        setErrors(prev => ({
            ...prev, "noInputError": false
        }));
        if (event.target.name === "name") {
            if (!field.name.match(/^[a-zA-Z]+$/) || !field.name || field.name.length < 3 || field.name.length > 50) {
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
                            defaultValue={field.name}
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
                            defaultValue={field.label}
                            onChange={handleInputField("label")}
                            onBlur={handleValidation}
                        />
                    </Grid>
                    {field instanceof IntegerField &&
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
                                defaultValue={field.min}
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
                                defaultValue={field.max}
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
                                defaultValue={field.default}
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