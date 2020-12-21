/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 1:49
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import {grey, orange} from "@material-ui/core/colors";

const styles = (theme: Theme) => createStyles({
    pluginDialogTitle: {
        width: "100%",
        textAlign: "center",
    },
    maxDialogWidth: {
        width: 900,
    },
    descriptionPadding: {
        padding: theme.spacing(0, 2, 0, 2),
    },
    descriptionListItem:{
        paddingBottom: theme.spacing(0),
    },
    mainBox:{
        display:"flex",
    },
    boxWithInfo:{
        width:320,
        // borderRight: `1px solid ${grey[400]}`,
        marginRight:20,
        margin: theme.spacing(1, 0, 1, 0)
    },
    readmeBox:{
        width: 550,
        borderLeft: `1px solid ${grey[700]}`,
        margin: theme.spacing(1, 0, 1, 0),
        marginRight:10,
    },
    readme:{
        height: 400,
        overflow: "auto",
        margin: theme.spacing(1, 1.5, 1, 2),
        // marginLeft: 12,
    },
    descriptionOverflow: {
        width: 300,
    },
    noReadme:{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems:"center",
    },
    settingSpecList:{
        height: 480,
        overflow: "auto"
    }

});

export default styles;