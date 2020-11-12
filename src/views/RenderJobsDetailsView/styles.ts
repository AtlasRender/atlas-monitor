/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';

const styles = (theme: Theme) => createStyles({
    pathText: {
        color: grey[500],
    },
    mainText: {
        marginTop: theme.spacing(2),
        fontWeight: 700,
    },
    progressMargin: {
        marginBottom: theme.spacing(2),
    },
    dividerMargin: {
        marginBottom: theme.spacing(2),
    },
    pluginMargin: {
        marginTop: theme.spacing(2),
    },
    boxContainer: {
        backgroundColor: grey[200],
        borderRadius: 3,
        padding: theme.spacing(1),
    },
    boxContainerTitle: {
        fontSize: 9,
        color: grey[500],
    },
    boxContainerText: {
        fontSize: 16,
        fontWeight: 500,
    },
    customTabsMargin: {
        marginTop: theme.spacing(2),
    },
    normalContent: {
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
    box: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    iconButton: {
        top: 8,
    },
    loading: {
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;
