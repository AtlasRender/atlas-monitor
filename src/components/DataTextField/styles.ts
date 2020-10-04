/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 19:12
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const styles = (theme: Theme) => createStyles({
    boxContainer: {
        backgroundColor: grey[200],
        borderRadius: 3,
        padding: theme.spacing(1),
    },
    boxContainerTitle: {
        fontSize: 9,
        color: grey[500],
    },
    boxContainerText: {
        fontSize: 16,
        fontWeight: 500,
    },
});

export default styles;