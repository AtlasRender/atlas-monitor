/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 21:17
 * All rights reserved.
 */

import React, {Ref} from 'react';
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
    } = props;

    const [progress, setProgress] = React.useState(10);

    /**
     * React.useEffect - forces progress bar to move
     * @function
     * @author Andrii Demchyshyn
     */
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 1 : prevProgress + 1));
        }, 100);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box className={clsx(classes.root, className)}>
            <LinearProgressWithLabel value={progress}/>
        </Box>
    );
});

export default withStyles(styles)(Progress);
