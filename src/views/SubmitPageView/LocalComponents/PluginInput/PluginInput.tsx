/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 20:57
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../../../interfaces/Stylable";
import useCoreRequest from "../../../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";


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


    const [plugin, setPlugin] = useState();


    useEffect(() => {
        handleGetPlugin();
    }, []);


    const handleGetPlugin = () => {
        coreRequest()
            .get(`/plugins/${pluginId}/preview`)
            .then(response => {
                console.log(response.body)
                setPlugin(response.body);
            })
            .catch(err => {
                enqueueErrorSnackbar("Cant get plugin")
            })
    }

    return (
        <div>
            hello
        </div>
    );
});

export default withStyles(styles)(PluginInput);