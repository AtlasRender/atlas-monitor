/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 03.10.2020, 17:33
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles =(theme: Theme) => createStyles({
    container:{
        alignItems: "center",
        justifyContent:"center",
    },
    containerItem:{
        justifyContent:"space-between",
        padding:theme.spacing(1),
    }

});

export default styles;