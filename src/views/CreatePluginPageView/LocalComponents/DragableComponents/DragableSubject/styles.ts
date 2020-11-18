/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 17:29
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'inline-block',
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        backgroundColor: 'white',
        cursor: 'move',
    }
});

export default styles;