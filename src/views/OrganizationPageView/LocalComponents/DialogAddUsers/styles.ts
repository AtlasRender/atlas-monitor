/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {createStyles, fade, Theme} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    dialog: {
        minWidth: 500,
        [theme.breakpoints.down("xs")]: {
            minWidth: 300,
        },
        height: 512,
        overflow:"auto",
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
    searchBar:{
        padding:theme.spacing(1,1.5,0,1.5)
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
            width: "40ch",
        },
    },
    paddingNoneBottom: {
        paddingBottom: 0,
    },
    searchInput: {
        background: grey[700],
        borderRadius: 4,
        padding: theme.spacing(0.5, 1)
    },
    iconSearch: {
        "&:hover": {
            color: "#454545",
            cursor: "pointer",
        },
    }
});

export default styles;