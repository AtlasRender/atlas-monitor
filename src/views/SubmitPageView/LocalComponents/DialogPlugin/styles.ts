/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 22:45
 * All rights reserved.
 */

import {createStyles, fade, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    dialog: {
        minWidth: 800,
        [theme.breakpoints.down("sm")]: {
            minWidth: 500,
        },
        [theme.breakpoints.down("xs")]: {
            minWidth: 300,
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "24ch",
        },
    },
    paddingNoneBottom: {
        paddingBottom: 0,
    },
    loading: {
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
    },
    notFound: {
        display: "flex",
        width: "100%",
        height: 220,
        justifyContent: "center",
        alignItems: "center",
    },
    pluginContainer: {
        height: 220,
        overflow: "auto"
    }
});

export default styles;