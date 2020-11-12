/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
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
    gridContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    loading: {
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;