/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 01.12.2020, 03:36
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    container: {
        width: "100%",
        padding: theme.spacing(1),
    },
    separator: {
        background: grey[500],
        width: "100%",
    }
});

export default styles;
