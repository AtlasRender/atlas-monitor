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
import {Box, Divider, Grid, IconButton, Typography, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import clsx from "clsx";
import {
    AreaSeries,
    ArgumentAxis,
    BarSeries,
    Chart,
    LineSeries,
    Title,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import {Animation} from '@devexpress/dx-react-chart';
import Stylable from "../../../../interfaces/Stylable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const data = [
    {time: '1', slaves: 10},
    {time: '2', slaves: 30},
    {time: '3', slaves: 20},
    {time: '4', slaves: 56},
    {time: '5', slaves: 0},
    {time: '6', slaves: 101},
    {time: '7', slaves: 32},
];

/**
 * StatisticsTabProps - interface for StatisticsTab component
 * @interface
 * @author Andrii Demchyshyn
 */
interface StatisticsTabProps extends Stylable {
}

/**
 * StatisticsTab - creates tab page with statistics graphics
 * @function
 * @author Andrii Demchyshyn
 */
const StatisticsTab = React.forwardRef((props: StatisticsTabProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    let height;

    if (matches) {
        height = 400
    } else {
        height = 300
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h5" className={clsx(classes.textMain, className)}>
                Statistics
            </Typography>
            <Divider className={clsx(classes.dividerMargin, className)}/>
            <Grid container spacing={2} ref={ref}>
                <Grid item xs={12} md={6}>
                    <Chart
                        data={data}
                        height={height}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <BarSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slaves at current time"/>
                        <Animation/>
                    </Chart>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Chart
                        data={data}
                        height={height}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <LineSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Render speed"/>
                        <Animation/>
                    </Chart>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={11}>
                    <Typography variant="h6" className={clsx(classes.pluginMargin, className)}>
                        Slaves
                    </Typography>
                </Grid>
                <Grid item xs={1} className={clsx(classes.box, className)}>
                    <IconButton className={clsx(classes.iconButton, className)}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider className={clsx(classes.dividerMargin, className)}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 1"/>
                        <Animation/>
                    </Chart>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 2"/>
                        <Animation/>
                    </Chart>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 3"/>
                        <Animation/>
                    </Chart>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 4"/>
                        <Animation/>
                    </Chart>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Chart
                        data={data}
                        height={300}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <AreaSeries
                            valueField="slaves"
                            argumentField="time"
                        />
                        <Title text="Slave 5"/>
                        <Animation/>
                    </Chart>
                </Grid>
            </Grid>
        </Box>
    );
});
StatisticsTab.displayName = "StatisticsTab";
StatisticsTab.propTypes = {}

export default withStyles(styles)(StatisticsTab);
