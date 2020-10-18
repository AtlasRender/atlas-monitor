/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 17:32
 * All rights reserved.
 */

import {createStyles, fade, Theme} from "@material-ui/core";
import { grey } from '@material-ui/core/colors'

const styles =(theme: Theme) => createStyles({
    firstLine:{
        justifyContent: "center",
        alignItems:"center",
        listStyleType:"none",
    },
    nameDescription:{
        justifyContent:"flex-begin",
    },
    settingButtongAlign:{
        display:"flex",
        flexAlignment:"flex-end",
    },
    avatar: {
        height: theme.spacing(25),
        width: theme.spacing(25),
    },
    itemsRowBackground:{
        marginBottom: theme.spacing(1),
        backgroundColor: grey[200],
        borderRadius: "5px",
    },
    selectFieldStyle: {
        borderRadius: "5px",
    },
    avatarBox:{
        display: "flex",
        justifyContent:"center",
        marginTop: theme.spacing(2),
        width:"inherit",
    },
    paddingNone:{
        paddingLeft: 0,
        paddingBottom:0,
    },
    dialog: {
        minWidth: 500,
        [theme.breakpoints.down('xs')]: {
            minWidth: 300,
        },
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
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
        },
    },
    paddingNoneBottom: {
        paddingBottom: 0,
    }
})
export default styles;