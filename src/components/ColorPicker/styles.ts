/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const styles = (theme: Theme) => createStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
        padding: theme.spacing(1),
    },
    defaultContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    color: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 3,
        marginLeft: 3,
        marginBottom: 6,
        padding: 0,
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
    },
    paddingLeft: {
        paddingLeft: theme.spacing(1),
        width: "100%",
    },
    inputAdornment: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        background: grey[200],
        borderRadius: "4px 0px 0px 4px",
        textAlign: "center",
        color: grey[600],
    },
    input: {
        maxWidth: 110,
        [theme.breakpoints.down("xs")]: {
            maxWidth: "100%",
            minWidth: "80%",
            width: "90%",
        },
        height: 30,
        padding: 0,
        color: grey[700],
        border: `1px solid ${grey[200]}`,
        borderRadius: "0px 4px 4px 0px",
    },
    insideInput: {
        marginLeft: 5,
    },

});

export default styles;