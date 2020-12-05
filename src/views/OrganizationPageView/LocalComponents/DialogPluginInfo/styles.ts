/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 1:49
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey, orange} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    pluginDialogTitle: {
        width: "100%",
        textAlign: "center",
    },
    pluginDialogBox: {
        padding: theme.spacing(1),
        height: 600,
        width: 500,
    },
    pluginDialog:{
        display:"flex",
    },
    pluginDialogRules:{
        padding: theme.spacing(1),
        height: 600,
        width: 500,
        borderLeft:`1px solid ${grey[700]}`
    },
    pluginType:{
        color: orange[500],
    },
    ruleName:{
        marginBottom: theme.spacing(1),
    }
})

export default styles;