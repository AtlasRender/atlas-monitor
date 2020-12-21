/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 19.12.2020, 17:27
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    title: {
      textAlign: "center",
        paddingBottom: 0,
    },
    dialogContainer: {
        minWidth: 600,
        [theme.breakpoints.down("sm")]: {
            minWidth: 450,
        },
        [theme.breakpoints.down("xs")]: {
            minWidth: 300,
        },
    },
    addButton: {
        margin: theme.spacing(2)
    }
});

export default styles;