/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

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
        width: "100%",
        // [theme.breakpoints.down('xs')]: {
        //     width: "auto",
        // },
    },
    rootFolder:{
        border: `1px solid ${grey[700]}`,
        minHeight: 300,
        padding:theme.spacing(2, 1, 2, 2),
    },

});

export default styles;