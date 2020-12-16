/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 16.12.2020, 18:57
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    searchInput: {
        background: grey[700],
        borderRadius: 4,
        padding: theme.spacing(0.5, 1)
    },
    iconSearch: {
        "&:hover": {
            color: "#454545",
            cursor: "pointer",
        },
    }
});

export default styles;