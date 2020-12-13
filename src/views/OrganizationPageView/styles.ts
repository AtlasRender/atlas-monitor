/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey, orange} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    loading: {
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
    },
    firstLine: {
        justifyContent: "center",
        alignItems: "center",
        listStyleType: "none",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    nameDescription: {
        justifyContent: "flex-begin",
    },
    settingButtongAlign: {
        display: "flex",
        flexAlignment: "flex-end",
    },
    avatar: {
        height: theme.spacing(25),
        width: theme.spacing(25),
    },
    itemsRowBackground: {
        marginBottom: theme.spacing(1),
        backgroundColor: grey[200],
        borderRadius: "5px",
    },
    selectFieldStyle: {
        borderRadius: "5px",
    },
    avatarBox: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        width: "inherit",
    },
    paddingNone: {
        paddingLeft: 0,
        paddingBottom: 0,
    },
    colorBar: {
        width: 4,
        height: theme.spacing(7),
    },
    rolesDescription: {
        width: 500,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        [theme.breakpoints.down("xs")]: {
            width: "70%",
        },
    },
    rolesPrimary: {
        width: 500,
        overflowWrap: "anywhere",
        [theme.breakpoints.down("xs")]: {
            width: "70%",
        },
    },
    roleItem: {
        paddingLeft: theme.spacing(2),
    },
    pluginOptionBox:{
        width:400,
        height:300,
    },
    pluginOptionButton:{
        height:50,
    }
});
export default styles;