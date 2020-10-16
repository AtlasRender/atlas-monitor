/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 11:17
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    container:{
        justifyContent:"center",
        alignItems:"center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),

    },
    box:{
        display: "flex",
        justifyContent: "flex-begin",
        alignItems:"flex-end"
    },
    lastToken: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.dark,
    },
    paddingNone:{
        paddingLeft: 0,
        paddingBottom:0,
    },
    newToken:{
        paddingLeft:0,
        paddingRight:0,
    },
    tokenAdd:{
        paddingLeft:0,
        paddingRight:0,
    },
    spacingInNewToken:{
        paddingRight:theme.spacing(2),
    },
    topMargin:{
        marginTop:theme.spacing(1),
    },
    generatedToken: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
    },
    noWrap: {
        flexWrap:"nowrap",
    },
    createTokenControls:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
    },

});

export default styles