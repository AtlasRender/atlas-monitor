/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 18:14
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const styles = (theme: Theme) => createStyles({
    folder:{
        border: `1px solid ${grey[700]}`,
        padding: theme.spacing(2, 2, 2, 2),
        minHeight: 50,
        width: "100%",
    }
});

export default styles;