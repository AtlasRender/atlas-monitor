/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    header: {
        background: theme.palette.header.dark,
        color: theme.palette.common.white,
    }
});

export default styles;