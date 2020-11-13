/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
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

interface DialogPluginProps extends Stylable {
    open: boolean;

    onClose(): void;

    onAddField(event: any, field: BasicPluginField | InputField): void;

    idGenerator(): number;
}


const DialogPlugin = React.forwardRef((props: DialogPluginProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        onClose,
        onAddField,
        idGenerator,
    } = props;

    const [fieldType, setFieldType] = useState("inputField");
    const [addField, setAddField] = useState({
        name: "",
        niceName: "",
        min: 1,
        max: 255,
        default: "",
        id: 0,
    });

    useEffect(()=>{
        setAddField({
            name: "",
            niceName: "",
            min: 1,
            max: 255,
            default: "",
            id: addField.id
        });
    },[open])

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

    function handleAddFiled(event: any) {
        if (fieldType === "inputField") {
            setAddField(prev=>({...prev, id: idGenerator()}));
            onAddField(event, new InputField(addField));

        } else if (fieldType === "divider") {
            setAddField(prev=>({...prev, id: idGenerator()}));
            onAddField(event, new BasicPluginField(addField));

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
                        <Grid item xs={12}>
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
                        <Grid item xs={12} className={classes.gridPadding}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                defaultValue={addField.name}
                                onChange={handleInputField("name")}
                            />
                        </Grid>
                        {fieldType === "inputField" &&
                        <React.Fragment>
                            <Grid item xs={12} className={classes.gridPadding}>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    name="niceName"
                                    label="Displayable name"
                                    defaultValue={addField.niceName}
                                    onChange={handleInputField("niceName")}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridPadding}>
                                <TextField
                                    type="number"
                                    variant="standard"
                                    required
                                    fullWidth
                                    name="min"
                                    label="Min value"
                                    defaultValue={addField.min}
                                    onChange={handleInputField("min")}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridPadding}>
                                <TextField
                                    type="number"
                                    variant="standard"
                                    required
                                    fullWidth
                                    name="max"
                                    label="Max value"
                                    defaultValue={addField.max}
                                    onChange={handleInputField("max")}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridPadding}>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    name="default"
                                    label="Default Value"
                                    defaultValue={addField.default}
                                    onChange={handleInputField("default")}
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