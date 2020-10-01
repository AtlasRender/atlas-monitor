/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 20:04
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    textMain: {
        fontWeight: 500,
    },
    dividerMargin: {
        marginBottom: theme.spacing(2),
    },
    pluginMargin: {
        marginTop: theme.spacing(2),
    },
    chartHeight: {
      height: 300
    },
});

export default styles;