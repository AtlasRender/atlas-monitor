/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 11.11.2020, 18:21
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    firstLine:{
        justifyContent: "center",
        alignItems:"center",
        listStyleType:"none",
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    paddingNone:{
        paddingLeft: 0,
        paddingBottom:0,
    },
});

export default styles;