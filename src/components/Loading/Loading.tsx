/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 23.10.2020, 16:59
 * All rights reserved.
 */

import React, {Ref} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";
import {CircularProgress} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";

/**
 * LoadingProps - interface for List component
 * @interface
 * @author Andrii Demchyshyn
 */
interface LoadingProps extends Stylable {

}

/**
 * LoadingProps - creates loading icon
 * @function
 * @author Andrii Demchyshyn
 */
const Loading = React.forwardRef((props: LoadingProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return (
        <React.Fragment>
            <CircularProgress
                size={75}
            />
        </React.Fragment>
    );
});

export default withStyles(styles)(Loading);