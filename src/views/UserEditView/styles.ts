/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    firstLine:{
        justifyContent: "center",
        alignItems:"center",
        listStyleType:"none",
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    dangerZoneContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    dangerZoneButton: {
        margin: theme.spacing(2, 0),
    },
    dangerZoneHeader: {
        paddingBottom: 0,
        color: theme.palette.error.dark,
    },
    dangerZoneDivider: {
        backgroundColor: theme.palette.error.dark,
    },
    avatar: {
        variant: "circle",
        height: theme.spacing(26),
        width: theme.spacing(26),
    },
    avatarContainer: {
        display: "flex",
        justifyContent: "center",
        marginLeft: 16
    },
    userContainer: {
        display: "flex",
    },
    editFieldsContainer: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
    },
    editField: {
        marginBottom: theme.spacing(2),
    },
    loading: {
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;