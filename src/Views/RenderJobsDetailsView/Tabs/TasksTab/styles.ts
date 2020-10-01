/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 18:22
 * All rights reserved.
 */

/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 18:13
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: "74vh",
    },
    textMain: {
        marginBottom: theme.spacing(2),
        fontWeight: 500,
    }
});

export default styles;