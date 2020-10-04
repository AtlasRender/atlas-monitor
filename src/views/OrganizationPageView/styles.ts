/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 17:32
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
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
        variant: "circle",
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
    }
})
export default styles;