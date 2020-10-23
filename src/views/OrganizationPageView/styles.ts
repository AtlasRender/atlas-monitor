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
    loading: {
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
    },
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
    colorBar:{
        width: 4,
        height: theme.spacing(7),
    },
})
export default styles;