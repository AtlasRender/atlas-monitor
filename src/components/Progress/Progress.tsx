/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {withStyles} from '@material-ui/core/styles';
import LinearProgress, {LinearProgressProps} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from "clsx";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";

/**
 * ProgressProps - interface for Progress component
 * @interface
 * @author Andrii Demchyshyn
 */
interface ProgressProps extends Stylable {
    progress: number;
}

/**
 * LinearProgressWithLabel -
 * @param props
 * @function
 * @author Andrii Demchyshyn
 */
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

/**
 * Progress - creates progress bar component with % count
 * @function
 * @author Andrii Demchyshyn
 */
const Progress = React.forwardRef((props: ProgressProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        progress,
    } = props;

    const [jobProgress, setJobProgress] = useState(0);

    useEffect(() => {
        setJobProgress(progress);
    }, [progress])

    /**
     * React.useEffect - forces progress bar to move
     * @function
     * @author Andrii Demchyshyn
     */

    return (
        <Box className={clsx(classes.root, className)}>
            <LinearProgressWithLabel value={jobProgress}/>
        </Box>
    );
});

export default withStyles(styles)(Progress);
