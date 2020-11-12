/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey, red} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    container:{
        justifyContent:"center",
        alignItems:"center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },

    },
    box:{
        display: "flex",
        justifyContent: "flex-begin",
        alignItems:"flex-end"
    },
    lastToken: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.light,
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
        alignItems: "flex-begin",
        justifyContent:"flex-begin",
        textWrap:"wrap",
        flexDirection:"column",
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
        marginLeft:theme.spacing(2),
    },
    noWrap: {
        flexWrap:"nowrap",
    },
    createTokenControls:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
    },
    wrapWord: {
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        wordBreak: "break-all",
    },
    closeButtonColor:{
        color:grey[50],
    },
    copyClipboardHover:{
        "&:hover": {
            backgroundColor: red[400],
        },

    }

});

export default styles