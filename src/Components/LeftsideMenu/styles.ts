/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 17:12
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';

const styles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1,
        height: "100vh",
        borderRight: `1px solid ${grey[300]}`,
        boxShadow: `0px 0px 4px${grey[500]}`,

    },
    menuBlockRoot: {
        height: 50,
        paddingLeft: theme.spacing(2),
        backgroundColor: grey[300],
    }
});

export default styles;