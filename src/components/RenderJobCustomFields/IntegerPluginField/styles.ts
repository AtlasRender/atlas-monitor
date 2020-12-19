/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 22:17
 * All rights reserved.
 */

import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    field: {
        paddingRight: theme.spacing(2),
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        }
    },
    sliderStyles: {

    },
    thumb: {
        height: 24,
        width: 24,
        marginTop: -10,
        marginLeft: -12,
        borderRadius: 4,
    },
    rail: {
        height: 10,
    }
});

export default styles;