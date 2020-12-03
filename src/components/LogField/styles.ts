/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 23:28
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    dialogContainer: {
        counterReset: "line 0",
        height: 700,
        [theme.breakpoints.down("sm")]: {
            height: 500,
        },
        [theme.breakpoints.down("xs")]: {
            height: 400,
        },
        background: grey[900],
        overflow: "auto",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
        margin: theme.spacing(0, 2, 2, 2),
        padding: 0,
        borderRadius: theme.spacing(0.5),
    },
    dialogTitle: {
        textAlign: "center",
    },
    row: {
        padding: theme.spacing(0, 2),
        counterIncrement: "line",
        "&:before": {
            content: "counter(line)",
            borderRight: `1px solid ${grey[700]}`,
            padding: theme.spacing(0.5),
            paddingRight: theme.spacing(2),
            marginRight: theme.spacing(2),
            color: grey[700],
            textAlign: "right",
            minWidth: 60,
        },
    },
    rowText: {
        overflowWrap: "break-word",
        fontFamily: "Monospace",
        fontSize: 16,
    },
})

export default styles;