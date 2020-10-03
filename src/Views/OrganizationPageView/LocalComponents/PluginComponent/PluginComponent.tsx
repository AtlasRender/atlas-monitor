/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 03.10.2020, 17:32
 * All rights reserved.
 */

import React, {Ref} from "react";
import {withStyles, Box, Grid, Select} from "@material-ui/core";
import styles from "./styles";
import DataTextField from "../../../../Components/DataTextField";

interface PluginComponentPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
    children?: string;
}

const PluginComponent = React.forwardRef((props: PluginComponentPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        children,
    } = props;

    return (
        <Box>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs = {10} className={classes.containerItem}>
                    <Grid item xs={2}>
                        <DataTextField label="Plugin name" children={children}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            native
                            value="version"
                        >
                            <option value={"v.1.0.1"}>v.1.0.1</option>
                            <option value={"v.1.0.2"}>v.1.0.2</option>
                            <option value={"v.1.0.3"}>v.1.0.3</option>
                        </Select>

                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
});

export default withStyles(styles)(PluginComponent);