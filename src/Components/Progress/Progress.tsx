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

interface ProgressPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

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

const Progress = React.forwardRef((props: ProgressPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 1 : prevProgress + 1));
        }, 100);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={clsx(classes.root, className)}>
            <LinearProgressWithLabel value={progress}/>
        </div>
    );
});

export default withStyles(styles)(Progress);