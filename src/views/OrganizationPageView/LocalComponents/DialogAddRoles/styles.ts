/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 21:48
 * All rights reserved.
 */

import {createStyles, fade, Theme} from "@material-ui/core";

const styles =(theme: Theme) => createStyles({
    firstLine:{
        justifyContent: "center",
        alignItems:"center",
        listStyleType:"none",
    },
    dialogRoles: {
        width : "100%",
        textAlign: "center",
        paddingBottom: 0,
    },
    gridPadding: {
        marginBottom: theme.spacing(1),
    },
    paddingNone:{
        paddingLeft: 0,
        paddingBottom:0,
    },
    newRole: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: 375,
        },
    }
});

export default styles;