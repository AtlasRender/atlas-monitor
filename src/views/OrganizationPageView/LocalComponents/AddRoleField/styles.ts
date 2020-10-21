/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 18:01
 * All rights reserved.
 */

import {createStyles, fade, Theme} from "@material-ui/core";

const styles =(theme: Theme) => createStyles({
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