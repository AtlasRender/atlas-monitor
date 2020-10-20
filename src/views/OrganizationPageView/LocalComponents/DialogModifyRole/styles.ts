/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 18:28
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles =(theme: Theme) => createStyles({
    dialog: {
        minWidth: 800,
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            minWidth: 400,
        },
    },
    dialogRoles: {
        width : "100%",
        textAlign: "center",
        paddingBottom: 0,
    },
    newRole:{
        paddingLeft:0,
        paddingRight:0,
    },
    roleAdd:{
        paddingLeft:0,
        paddingRight:0,
        marginBottom: theme.spacing(2),
    },
    spacingInNewRole:{
        paddingRight:theme.spacing(2),
    },
});

export default styles;