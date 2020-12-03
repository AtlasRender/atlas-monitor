/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 1:49
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Box, Button, Dialog, DialogTitle, Divider, Grid, TextField, Typography, withStyles} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import PluginFull from "../../../../interfaces/PluginFull";

interface DialogPluginInfoProps extends Stylable{
    currentPlugin: PluginFull,
    open: boolean,
    onClose():void,
}

const DialogPluginInfo = React.forwardRef((props: DialogPluginInfoProps, ref: Ref<any>) => {
    const{
        style,
        classes,
        className,
        open,
        currentPlugin,
        onClose,
    }=props;

    return(
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
        >
            <DialogTitle className={classes.pluginDialogTitle}>
                {currentPlugin?.name}
            </DialogTitle>
            <Divider/>
            <Box className={classes.pluginDialog}>
                <Box className={classes.pluginDialogBox}>
                    <Typography variant="h6">Version: {currentPlugin?.version}</Typography>
                    <Typography variant="h6">Note: {currentPlugin?.note}</Typography>
                    <Typography variant="h6">Readme: {currentPlugin?.readme}</Typography>
                    <Typography style={{paddingTop:16}}>{currentPlugin?.description}</Typography>
                </Box>
                <Box className={classes.pluginDialogRules}>
                    {currentPlugin?.rules.map((item)=>{
                        return(
                            <Grid container style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
                                <TextField
                                    InputProps={{readOnly: true}}
                                    value={item.name}
                                    className={classes.ruleName}
                                />
                                <Typography className={classes.pluginType}>{item.getType()}</Typography>
                            </Grid>
                        );
                    })}
                </Box>
            </Box>
            <Button fullWidth onClick={onClose}>Close</Button>
        </Dialog>
    )
})

export default withStyles(styles)(DialogPluginInfo);