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
import {IntegerField, PluginSetting, PluginSettingsSpec, StringField} from "@atlasrender/render-plugin";
import SeparatorPluginField from "../../../../components/SeparatorPluginField";
import BooleanPluginField from "../../../../components/BooleanPluginField";
import StringPluginField from "../../../../components/RenderJobCustomFields/StringPluginField";
import IntegerPluginField from "../../../../components/RenderJobCustomFields/IntegerPluginField";


/**
 * SubmitPagePropsStyled - interface for SubmitPageView function
 * @interface
 * @author Andrii Demchyshyn
 */
interface PluginInputProps extends Stylable {
    pluginId: number;

    setPluginSetting(field: PluginSetting, value: number | string | null): void,
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
        setPluginSetting,
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
            const response = await coreRequest().get(`plugins/${pluginId}`);
            //TODO validation for rules
            console.log(response.body.rules);
            const temp = {...response.body, rules: new PluginSettingsSpec(response.body.rules)};
            // const temp = {...response.body, rules: response.body.rules};
            setPlugin(temp);
        } catch (err) {
            enqueueErrorSnackbar("Cant get plugin");
        }

    }

    const [state, setState] = useState(false);

    function handleChange() {
        setState(!state);
    }

    // const [str, setStr] = useState<string | null>("hello");

    // function handleChangeStr(value: string | null) {
    //     setStr(value);
    // }

    // console.log(str);

    let pluginCopy: PluginSetting[] = [];

    if (plugin) {
        pluginCopy = [...plugin.rules];
    }

    return (
        (loaded && plugin) ?
            <Box>
                <Typography variant="h6" className={classes.header}>
                    {plugin.name}
                </Typography>
                <Grid container spacing={2}>
                    {pluginCopy.map((field: PluginSetting) => {
                        switch (field.getType()) {
                            case "integer" :
                                return (
                                    <Grid item xs={12}>
                                        <IntegerPluginField field={field as IntegerField}
                                                            setPluginSetting={setPluginSetting}/>
                                    </Grid>
                                );
                            case "string" :
                                return (
                                    <Grid item xs={12}>
                                        <StringPluginField field={field as StringField}
                                                           setPluginSetting={setPluginSetting}/>
                                    </Grid>
                                );
                            case "float" :
                                return (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={field.label}
                                        />
                                    </Grid>
                                );
                            case "group" :
                                return (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={field.label}
                                        />
                                    </Grid>
                                );
                            case "separator" :
                                return (
                                    <Grid item xs={12}>
                                        <SeparatorPluginField label="label"/>
                                    </Grid>
                                );
                            case "boolean" :
                                return (
                                    <Grid item xs={12}>
                                        <BooleanPluginField value={state} onChange={handleChange} label="Description"/>
                                    </Grid>
                                );
                        }
                    })}
                </Grid>
            </Box>
            :
            <Box/>
    );
});

export default withStyles(styles)(PluginInput);