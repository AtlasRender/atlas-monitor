/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 04.10.2020, 16:17
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {blue, grey} from "@material-ui/core/colors";


const styles = (theme: Theme) => createStyles({
    container: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    flexNoWrap:{
        flexWrap:"nowrap",
    },
    flexItem:{
        display: "flex",
        //justifyContent: "space-between",
        alignItems:"center",
        listStyleType: "none",
    },
    buttonAdd:{
        backgroundColor:grey[200],
    },
    fullWidth:{
        width:"100%",
    },
    submitButton:{
        backgroundColor: blue[500],
    },
    chipStyle:{
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    selectMargin:{
        marginTop:theme.spacing(2),
    },
});

export default styles;