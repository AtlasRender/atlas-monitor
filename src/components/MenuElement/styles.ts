/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 17:59
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    container: {
        padding: theme.spacing(2, 1),
    },
    listIcon: {
        justifyContent: "center",
    },
    listText:{
        marginLeft: 8,
    }
})

export default styles;