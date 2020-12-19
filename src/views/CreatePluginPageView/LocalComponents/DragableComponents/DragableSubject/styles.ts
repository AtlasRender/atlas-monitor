/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 17:29
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    container: {
        padding: theme.spacing(1),
        borderRadius: 2,
        "&:hover": {
            background: grey[800],
        }
    },
    draggingContainer: {
        padding: theme.spacing(1),
        borderRadius: 2,
        background: grey[800],
    }

});

export default styles;