/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 17:18
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    containerToken:{
        justifyContent:"center",
        alignItems:"center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    root: {
        display: "flex",
        flexDirection: "row",
    },
    avatar: {
        variant: "circle",
        height: theme.spacing(25),
        width: theme.spacing(25),
    },
    container:{
        alignItems: "center",
        justifyContent:"center",
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    topic:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    box:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems:"center"
    },
    typographyToken:{
        display:"flex",
        alignItems:"flex-end",
    },


});

export default styles;