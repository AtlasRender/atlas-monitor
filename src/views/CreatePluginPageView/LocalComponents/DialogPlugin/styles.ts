/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 11.11.2020, 20:38
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles =(theme: Theme) => createStyles({
    dialogRoles: {
        width : "100%",
        textAlign: "center",
        paddingBottom: theme.spacing(2),
    },
    gridPadding: {
        marginBottom: theme.spacing(1),
    },
    dialogSize: {
        width: 536,
        [theme.breakpoints.down('xs')]: {
            width: "auto",
        },
    }
});

export default styles;