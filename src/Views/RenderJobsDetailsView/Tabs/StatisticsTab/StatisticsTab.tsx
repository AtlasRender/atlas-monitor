/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 18:53
 * All rights reserved.
 */

import React, {Ref} from 'react';
import styles from "./styles";
import {Box, Divider, Grid, Typography, withStyles} from "@material-ui/core";
import clsx from "clsx";
import {
    Chart,
    BarSeries,
    LineSeries,
    AreaSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
    { time: '1', slaves: 10 },
    { time: '2', slaves: 30 },
    { time: '3', slaves: 20 },
    { time: '4', slaves: 56 },
    { time: '5', slaves: 0 },
    { time: '6', slaves: 101 },
    { time: '7', slaves: 32 },
];

interface StatisticsTabPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const StatisticsTab = React.forwardRef((props: StatisticsTabPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return (
        <Box className={classes.root}>
            <Typography variant="h5" className={clsx(classes.textMain, className)}>
                Statistics
            </Typography>
            <Divider className={clsx(classes.dividerMargin, className)}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Chart
                        data={data}
                        height={400}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <BarSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slaves at current time" />
                        <Animation />
                    </Chart>
                </Grid>
                <Grid item xs={6}>
                    <Chart
                        data={data}
                        height={400}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <LineSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Render speed" />
                        <Animation />
                    </Chart>
                </Grid>
            </Grid>
            <Typography variant="h6" className={clsx(classes.pluginMargin, className)}>
                Slaves
            </Typography>
            <Divider className={clsx(classes.dividerMargin, className)}/>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 1" />
                        <Animation />
                    </Chart>
                </Grid>
                <Grid item xs={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 2" />
                        <Animation />
                    </Chart>
                </Grid>
                <Grid item xs={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 3" />
                        <Animation />
                    </Chart>
                </Grid>
                <Grid item xs={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 4" />
                        <Animation />
                    </Chart>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </Box>
    );
});
StatisticsTab.displayName = "StatisticsTab";
StatisticsTab.propTypes = {}

export default withStyles(styles)(StatisticsTab);