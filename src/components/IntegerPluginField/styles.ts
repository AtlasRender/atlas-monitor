/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 22:17
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) =>createStyles({
    box:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-end",
    },
    valueField:{
        display: "flex",
        flexGrow:2,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button:{
        flexGrow:1,
    },
    slider:{
        display:"flex",
        flexGrow:1,
    }
});

export default styles;