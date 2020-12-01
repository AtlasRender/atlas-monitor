/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    newRole: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    roleAdd: {
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: theme.spacing(2),
    },
    spacingInNewRole: {
        paddingRight: theme.spacing(2),
    },
});

export default styles;