/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 19:52
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paddingNone: {
        padding: 0,
    }
});

export default styles;