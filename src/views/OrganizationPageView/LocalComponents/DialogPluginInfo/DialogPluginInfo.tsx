/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 1:49
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {
    AppBar, Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    Divider,
    Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tab, Tabs,
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
import TextFieldsIcon from "@material-ui/icons/TextFields";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckIcon from "@material-ui/icons/Check";
import Filter1Icon from "@material-ui/icons/Filter1";
import FolderIcon from "@material-ui/icons/Folder";
import theme from "../../../../theme";

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

            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                className={classes.tabsColor}
                variant="fullWidth">
                <Tab label="Info" {...a11yProps(0)}/>
                <Tab label="Settings Spec" {...a11yProps(1)}/>
            </Tabs>

            <TabPanel value={value} index={0}>
                <Box className={classes.mainBox}>

                    <Box className={classes.boxWithInfo}>
                        <List style={{paddingTop: 0}}>
                            <ListItem className={classes.descriptionListItem} style={{paddingTop: 0}}>
                                <ListItemText
                                    primary="Version"
                                    secondary={currentPlugin.version}
                                    secondaryTypographyProps={{variant: "body2"}}
                                />
                            </ListItem>
                            {currentPlugin.description &&
                            <React.Fragment>
                                <ListItem className={classes.descriptionListItem}>
                                    <ListItemText
                                        primary="Description"
                                    />
                                </ListItem>
                                <Box className={clsx(classes.maxDialogWidth, classes.descriptionPadding)}>
                                    <Typography
                                        align="justify"
                                        variant="body2"
                                        color="textSecondary"
                                        className={classes.descriptionOverflow}
                                    >
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
                                    <Typography
                                        align="justify"
                                        variant="body2"
                                        color="textSecondary"
                                        className={classes.descriptionOverflow}
                                    >
                                        {currentPlugin.note}
                                    </Typography>
                                </Box>
                            </React.Fragment>
                            }
                        </List>
                    </Box>

                    <Box className={classes.readmeBox}>
                        <Typography
                            variant="h5"
                            align={"center"}
                            style={{padding: theme.spacing(1, 0, 1, 0)}}
                        >
                            README
                        </Typography>
                        <Divider/>
                        {currentPlugin.readme ?
                            <Box className={classes.readme}>
                                {readMe?.map((str) =>
                                    <Markdown>
                                        {str}
                                    </Markdown>
                                )}
                            </Box>
                            :
                            <Box className={clsx(classes.readme, classes.noReadme)}>
                                No ReadMe were provided
                            </Box>
                        }
                    </Box>

                </Box>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <List className={clsx(classes.maxDialogWidth, classes.settingSpecList)}>
                    {currentPlugin.rules.map((item) =>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    {item.getType() === "string" &&
                                    <TextFieldsIcon/>
                                    }
                                    {item.getType() === "separator" &&
                                    <RemoveIcon/>
                                    }
                                    {item.getType() === "boolean" &&
                                    <CheckIcon/>
                                    }
                                    {(item.getType() === "integer" || item.getType() === "float") &&
                                    <Filter1Icon/>
                                    }
                                    {item.getType() === "folder" &&
                                    <FolderIcon/>
                                    }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.getType()}/>
                        </ListItem>
                    )}
                </List>
            </TabPanel>
            <Button fullWidth onClick={onClose}>Close</Button>
        </Dialog>
    );
});

export default withStyles(styles)(DialogPluginInfo);