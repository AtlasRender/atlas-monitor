/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 20:57
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {Box, Grid, TextField, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../../../interfaces/Stylable";
import useCoreRequest from "../../../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";
import PluginFull from "../../../../interfaces/PluginFull";
import {PluginSettingsSpec} from "@atlasrender/render-plugin";


/**
 * SubmitPagePropsStyled - interface for SubmitPageView function
 * @interface
 * @author Andrii Demchyshyn
 */
interface PluginInputProps extends Stylable {
    pluginId: number;
}

/**
 * SubmitPageView - function for displaying Submit page
 * @function
 * @author Andrii Demchyshyn
 */
const PluginInput = React.forwardRef((props: PluginInputProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        pluginId,
    } = props;


    const coreRequest = useCoreRequest();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();


    const [plugin, setPlugin] = useState<PluginFull | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);


    useEffect(() => {
        Promise.all([
            handleGetPlugin(),
        ]).then(() => {
            setLoaded(true);
        });
    }, [pluginId]);


    async function handleGetPlugin() {
        try {
            const response = await coreRequest().get(`/plugins/${pluginId}`);
            //TODO validation for rules
            const temp = {...response.body, rules: response.body.rules};
            setPlugin(temp);
        } catch (err) {
            enqueueErrorSnackbar("Cant get plugin");
        }

    }


    return (
        (loaded && plugin) ?
            <Box>
                <Typography variant="h6" className={classes.header}>
                    {plugin.name}
                </Typography>
                <Grid container spacing={2}>
                    {plugin.rules.map(field => {
                        return (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={field.label}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            :
            <Box/>
    );
});

export default withStyles(styles)(PluginInput);