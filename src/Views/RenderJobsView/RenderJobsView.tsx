/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 17:13
 * All rights reserved.
 */

import React, {Ref} from 'react';
import {withStyles} from "@material-ui/core";


interface RenderJobsPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const RenderJobsView =React.forwardRef((props: RenderJobsPropsStyled, ref: Ref<any>) => {
    return (
        <div>
            Hello world
        </div>
    );
});

export default (RenderJobsView);