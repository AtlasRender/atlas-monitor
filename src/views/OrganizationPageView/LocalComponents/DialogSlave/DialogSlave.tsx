/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 08.12.2020, 18:08
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    Divider, Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction, TextField,
    withStyles
} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useTheme} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";

interface DialogSlaveProps extends Stylable {
    open: boolean,

    onClose(): void,
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

interface SlaveEnvType {
    [key: string]: string;
}

interface SlaveEnvArrayType {
    key: string;
    value: string;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}


const DialogSlave = React.forwardRef((props: DialogSlaveProps, ref: Ref<any>) => {
    const {
        style,
        classes,
        className,
        open,
        onClose,
    } = props;


    const theme = useTheme();


    const [slaveEnv, setSlaveEnv] = useState<SlaveEnvType>({name: "name", version: "version"});
    const [slaveEnvArray, setSlaveEnvArray] = useState<SlaveEnvType[]>([]);
    const [prevSlaveEnvArray, setPrevSlaveEnvArray] = useState<SlaveEnvType[]>([]);
    const [value, setValue] = useState(0);
    const [editable, setEditable] = useState(false);

    console.log(slaveEnvArray);

    useEffect(() => {
        let array = Object.entries(slaveEnv);
        let array2: any[] = [];
        array.forEach(([key, value]) => {
            array2.push({key: key, value: value});
        });
        setSlaveEnvArray(array2);

    }, [open]);

    const handleChangeSlaveEnv = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        event.persist();
        let array = [...slaveEnvArray];
        array.map((field, fieldIndex) => {
            if (index === fieldIndex) {
                field[event.target.name] = event.target.value;
                array.splice(index, 1, field);
            }
        });
        setSlaveEnvArray(array);

    };

    const handleAddSlaveEnv = () => {
        setSlaveEnvArray(prev => ([...prev, {key: "", value: ""}]));
    };

    const handleDeleteSlaveEnv = (index: number) => {
        let slaveEnvArrayCopy = [...slaveEnvArray];
        slaveEnvArrayCopy.splice(index, 1);
        setSlaveEnvArray(slaveEnvArrayCopy);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const handleChangeEditable = () => {
        console.log(prevSlaveEnvArray);
        setPrevSlaveEnvArray(slaveEnvArray.map(field => ({...field})));
        setEditable(!editable);
    };

    const handleCancel = () => {
        console.log("cancel:", prevSlaveEnvArray);
        setSlaveEnvArray(prevSlaveEnvArray.map(field => ({...field})));
        setEditable(false);
    };

    const handleOnClose = () => {
        setSlaveEnvArray([]);
        setPrevSlaveEnvArray([]);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleOnClose}
            maxWidth={false}
        >
            <DialogTitle className={classes.pluginDialogTitle}>
                Slave
            </DialogTitle>


            <Box className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Slave information" {...a11yProps(0)} />
                        <Tab label="Slave env" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Box>
                            <Typography variant="h6">
                                Name: Slave Name
                            </Typography>
                            <Typography variant="h6">
                                Info: Info
                            </Typography>
                            <Typography variant="h6">
                                Info: Info
                            </Typography>
                            <Typography variant="h6">
                                Info: Info
                            </Typography>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>

                        <List className={clsx(classes.paddingNone, classes.field)}>
                            <ListItem className={classes.paddingNone}>
                                <ListItemText primary="Environment variables" primaryTypographyProps={{variant: "h6"}}/>
                                <ListItemSecondaryAction>
                                    {editable &&
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={handleAddSlaveEnv}
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                    }
                                </ListItemSecondaryAction>

                            </ListItem>

                            <Divider style={{marginBottom: 8}}/>

                            {slaveEnvArray.map((field: any, index: number) => {
                                return (
                                    <ListItem
                                        key={index}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <TextField
                                                    disabled={!editable}
                                                    fullWidth
                                                    label="key"
                                                    name="key"
                                                    value={field.key}
                                                    onChange={(event) => handleChangeSlaveEnv(event, index)}
                                                />
                                            </Grid>
                                            <Grid item xs={editable ? 7 : 8}>
                                                <TextField
                                                    disabled={!editable}
                                                    fullWidth
                                                    label="value"
                                                    name="value"
                                                    value={field.value}
                                                    onChange={(event) => handleChangeSlaveEnv(event, index)}
                                                />
                                            </Grid>
                                            {editable &&
                                            <Grid item xs={1}>
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        style={{marginRight: 0, marginTop: 16}}
                                                        onClick={() => handleDeleteSlaveEnv(index)}
                                                    >
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </Grid>
                                            }
                                        </Grid>
                                    </ListItem>
                                );
                            })}

                        </List>

                        {editable ?
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleChangeEditable}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                            :
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleChangeEditable}
                            >
                                Edit
                            </Button>
                        }


                    </TabPanel>
                </SwipeableViews>
            </Box>


        </Dialog>
    );
});

export default withStyles(styles)(DialogSlave);