/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 15:20
 * All rights reserved.
 */

import {createStyles, fade, Theme} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    dialog: {
        maxWidth: 400,
    },
    dialogUsers: {
        width: "100%",
        textAlign: "center",
        paddingBottom: 0,
        marginTop: theme.spacing(2),
    },
    avatarContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
    },
    avatar: {
        width: 100,
        height: 100,
    },
    notFound:{
        display: "flex",
        width: "100%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    info: {
        width: "100%",
        textAlign: "center",
        marginTop: 0,
    },
    userContainer: {
        display: "flex",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    colorBar: {
        width: 4,
        height: theme.spacing(7),
    },
    menuPaper: {
        height: 400,
        width: 346,
        [theme.breakpoints.down('xs')]: {
            height: 300,
            width: 215,
        },
    },
    menuRoleBar: {
        width: 4,
        height: theme.spacing(6),
    },
    menuHeader: {
        paddingBottom: 0,
    },
    menuListItemText: {
        paddingLeft: theme.spacing(2),
        overflowWrap: "anywhere",
    },
    listItemHeader: {
        paddingBottom: 0,
    },
    dangerZoneContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dangerZoneButton: {
        margin: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    dangerZoneHeader: {
        paddingBottom: 0,
        color: theme.palette.error.dark,
    },
    dangerZoneDivider: {
        backgroundColor: theme.palette.error.dark,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        marginTop: theme.spacing(1),
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '11ch',
        [theme.breakpoints.up('sm')]: {
            width: '25ch',
        },
    },
    paddingNoneBottom: {
        paddingBottom: 0,
    },

});

export default styles;