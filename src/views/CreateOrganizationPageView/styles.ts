/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const styles = (theme: Theme) => createStyles({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        flexGrow: 1,
        height: theme.spacing(25),
        width: theme.spacing(25),
    },
    sidePaddingsNone: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    sidePaddings: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    paddingNone: {
        paddingLeft: 0,
        paddingBottom: 0,
    },
    listHeader: {
        paddingBottom: 0,
    },
    divider: {
        marginBottom: theme.spacing(2),
    },
    colorBar: {
        width: 4,
        height: theme.spacing(7),
    },
    minWidthList: {
        minWidth: 320,
    },
    button: {
        backgroundColor: grey[300],

    }

});

export default styles;
