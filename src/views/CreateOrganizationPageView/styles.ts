/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 18.10.2020, 21:31
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    container:{
        justifyContent:"center",
        alignItems:"center",
    },
    avatar: {
        flexGrow:1,
        height: theme.spacing(25),
        width: theme.spacing(25),
    },
    sidePaddingsNone:{
        paddingLeft:0,
        paddingRight:0,
    },
    sidePaddings:{
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
    },
    listHeader:{
        paddingBottom:0,
    },
    divider:{
        marginBottom: theme.spacing(2),
    },

});

export default styles;
