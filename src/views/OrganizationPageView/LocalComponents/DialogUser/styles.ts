/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 15:20
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles =(theme: Theme) => createStyles({
    dialog: {
        minWidth: 500,
        [theme.breakpoints.down('xs')]: {
            minWidth: 300,
        },
    },
    dialogUsers: {
        width : "100%",
        textAlign: "center",
        paddingBottom: 0,
    }
});

export default styles;