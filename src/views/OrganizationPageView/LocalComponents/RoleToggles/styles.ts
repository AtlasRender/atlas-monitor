/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 16.12.2020, 20:21
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme)=> createStyles({
    paddingNone: {
        paddingLeft: 0,
        paddingBottom: 0,
    },
    scroll: {
        height: 256,
        overflow: "auto",
    }
});

export default styles;