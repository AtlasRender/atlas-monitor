/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    textMain: {
        fontWeight: 500,
    },
    dividerMargin: {
        marginBottom: theme.spacing(2),
    },
    pluginMargin: {
        marginTop: theme.spacing(2),
    },
    chartHeight: {
      height: 300
    },
    box:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems:"center"
    },
    iconButton: {
        top: 8,
    },
});

export default styles;
