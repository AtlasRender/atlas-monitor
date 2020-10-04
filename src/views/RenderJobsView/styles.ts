/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 20:09
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: "74vh",
    },
    textMain: {
        margin: theme.spacing(2),
        fontWeight: 500,
    },
    box:{
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
    },
});

export default styles;
