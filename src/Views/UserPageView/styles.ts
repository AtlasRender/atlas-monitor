/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 17:18
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    root:{
        display: 'flex',
        flexDirection: "row",
    },
    firstLine:{
      justifyContent: "space-around",
      alignItems: "center",

    },
    avatar:{
        variant: 'circle',
        height: theme.spacing(25),
        width: theme.spacing(25),
    },
    textField:{
        variant: 'outlined',
        size: 'medium',
        rowsMax: 1,
    }
});

export default styles;