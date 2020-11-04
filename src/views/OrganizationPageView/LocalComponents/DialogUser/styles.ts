/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 20.10.2020, 15:20
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    dialog: {
        maxWidth: 400,
    },
    dialogUsers: {
        width: "100%",
        textAlign: "center",
        paddingBottom: 0,
        marginTop: theme.spacing(2),
    },
    avatarContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
    },
    avatar: {
        width: 100,
        height: 100,
    },
    info: {
        width: "100%",
        textAlign: "center",
        marginTop: 0,
    },
    userContainer: {
        display: "flex",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    colorBar: {
        width: 4,
        height: theme.spacing(7),
    },
    listItemHeader: {
        paddingBottom: 0,
    }

});

export default styles;