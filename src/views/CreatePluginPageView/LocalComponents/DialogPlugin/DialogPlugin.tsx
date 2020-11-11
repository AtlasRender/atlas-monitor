/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 11.11.2020, 20:38
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {Button, Dialog, DialogTitle, Divider, Grid, List, ListItem, withStyles,} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import BasicPluginField from "../../../../entities/BasicPluginField";
import InputField from "../../../../entities/InputField";

interface DialogPluginProps extends Stylable {
    open: boolean;

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
    } = props;


    const [addField, setAddField] = useState({
        name: "",
        niceName: "",
        min: 1,
        max: 255,
        default: ""
    });

    const handleInputField = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (name === "min" || name === "max") {
            setAddField(prev => (prev && {...prev, [name]: +event.target.value}));
        } else {
            setAddField(prev => (prev && {...prev, [name]: event.target.value}));
        }
    };

    function handleOnClose() {
        onClose();
    }

    function handleAddFiled(event: any) {
        onAddField(event, new InputField(addField));
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
            <List>
                <ListItem>
                    <Grid container>
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
                                label="Min number of elements"
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
                                label="Max number of elements"
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