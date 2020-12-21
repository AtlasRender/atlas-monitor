/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 1:49
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    Divider,
    Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Tab, Tabs,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import clsx from "clsx";
import styles from "./styles";
import PluginFull from "../../../../interfaces/PluginFull";
import {orange} from "@material-ui/core/colors";
import Markdown from "markdown-to-jsx";

interface DialogPluginInfoProps extends Stylable {
    currentPlugin: PluginFull,
    open: boolean,

    onClose(): void,
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const DialogPluginInfo = React.forwardRef((props: DialogPluginInfoProps, ref: Ref<any>) => {
    const {
        style,
        classes,
        className,
        open,
        currentPlugin,
        onClose,
    } = props;

    const readMe: string[] | undefined = currentPlugin.readme?.split("\n");

    function TabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        console.log(currentPlugin);

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
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

    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
        >
            <DialogTitle className={classes.pluginDialogTitle}>
                {currentPlugin.name}
            </DialogTitle>
            <Divider/>
            <AppBar position="static" className={classes.maxDialogWidth}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                    <Tab label="Info" {...a11yProps(0)}/>
                    <Tab label="Settings Spec" {...a11yProps(1)}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <List>
                    <ListItem>
                        <ListItemText primary="Version"/>
                        <ListItemSecondaryAction>
                            <Typography variant="body2"
                                        style={{color: orange[500]}}>{currentPlugin.version}</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {currentPlugin.description &&
                    <React.Fragment>
                        <ListItem className={classes.descriptionListItem}>
                            <ListItemText
                                primary="Description"
                            />
                        </ListItem>
                        <Box className={clsx(classes.maxDialogWidth, classes.descriptionPadding)}>
                            <Typography align="justify" variant="body2" color="textSecondary">
                                {currentPlugin.description}
                            </Typography>
                        </Box>
                    </React.Fragment>
                    }
                    {currentPlugin.note &&
                    <React.Fragment>
                        <ListItem className={classes.descriptionListItem}>
                            <ListItemText
                                primary="Note"
                            />
                        </ListItem>
                        <Box className={clsx(classes.maxDialogWidth, classes.descriptionPadding)}>
                            <Typography align="justify" variant="body2" color="textSecondary">
                                {currentPlugin.note}
                            </Typography>
                        </Box>
                    </React.Fragment>
                    }
                    {currentPlugin.readme &&
                    <React.Fragment>
                        <ListItem className={classes.descriptionListItem}>
                            <ListItemText
                                primary="README"
                            />
                        </ListItem>
                        <Box className={clsx(classes.maxDialogWidth, classes.descriptionPadding)}>
                            {readMe?.map((str)=>
                                <Markdown>
                                    {str}
                                </Markdown>
                            )}

                        </Box>
                    </React.Fragment>
                    }
                </List>
            </TabPanel>
            <Button fullWidth onClick={onClose}>Close</Button>
        </Dialog>
    );
});

export default withStyles(styles)(DialogPluginInfo);