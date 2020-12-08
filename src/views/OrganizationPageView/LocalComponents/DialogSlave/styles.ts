/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 08.12.2020, 18:08
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    pluginDialogTitle: {
        width: "100%",
        textAlign: "center",
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 800,
        minHeight: 600,
    },
    paddingNone: {
        padding: 0,
    },
    field: {
        paddingBottom: theme.spacing(2),
    }
});

export default styles;
