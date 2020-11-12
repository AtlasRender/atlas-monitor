/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: "74vh",
    },
    textMain: {
        marginBottom: theme.spacing(2),
        fontWeight: 500,
    },
    progress: {
        minWidth: 150,
        background: "transparent",
        [theme.breakpoints.down('md')]: {
            minWidth: 110,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
        },
    },
    box: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    iconButton: {
        top: -8,
    },
    iconVisible: {
        padding: 0,
    },
    cell: {
        background: "transparent",
    }
});

export default styles;
