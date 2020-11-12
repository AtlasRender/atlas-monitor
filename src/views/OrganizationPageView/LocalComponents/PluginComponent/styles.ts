/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles =(theme: Theme) => createStyles({
    container:{
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        margin: 0,
    },
    containerItem:{
        justifyContent:"space-between",
        display: "flex",
        // backgroundColor: grey[200],
        borderRadius:"5px",
        padding:theme.spacing(0),
        // paddingTop:theme.spacing(0.5),
        // paddingBottom: theme.spacing(0.5)
    },
    dataTextFieldFix:{
        padding: 0,
        //paddingLeft:theme.spacing(1),
        backgroundColor:"inherit",
    },
    selectAlignment:{
        display:"flex",
        justifyContent:"flex-end",
    }

});

export default styles;