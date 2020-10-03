/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 18:22
 * All rights reserved.
 */

import React, {Ref} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Box, Grid, IconButton, Typography, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Progress from "../../../../Components/Progress";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";
import Stylable from "../../../../Interfaces/Stylable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreVertIcon from "@material-ui/icons/MoreVert";

/**
 * TasksTabProps - interface for TasksTab component
 * @interface
 * @author Andrii Demchyshyn
 */
interface TasksTabProps extends  Stylable{
    /**
     * width - screen width
     * @type "xs" | "sm" | "md" | "lg" | "xl"
     */
    width: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * Data - interface for createData function
 * @interface
 * @author Andrii Demchyshyn
 */
interface Data {
    /**
     * idTable - id of table component
     * @type number
     */
    idTable: number
    /**
     * frame - frame of table component
     * @type string
     */
    frame: string;
    /**
     * startTime - time when frame begin render
     * @type string
     */
    startTime: string;
    /**
     * slave - name of slave
     * @type string
     */
    slave: string;
    /**
     * elapsedTime - time from starting of render
     * @type string
     */
    elapsedTime: string;
    /**
     * progress - implementation progress of table component
     * @type number
     */
    progress: number;
    /**
     * icon - icon for more details
     * @type any
     */
    icon: any;
}

/**
 * createData - creates table row
 * @param idTable
 * @param frame
 * @param startTime
 * @param slave
 * @param elapsedTime
 * @param progress
 * @param icon
 * @function
 * @author Andrii Demchyshyn
 */
function createData(idTable: number, frame: string, startTime: string, slave: string, elapsedTime: string, progress: number, icon: any): Data {
    return {idTable, frame, startTime, slave, elapsedTime, progress, icon};
}

/**
 * rows - array of table rows
 * @type string
 * @type number
 */
const rows = [
    createData(1, '1001', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(2, '1002', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(3, '1003', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(4, '1004', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(5, '1005', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(6, '1006', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(7, '1007', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(8, '1008', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(9, '1009', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(10, '1010', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(11, '1011', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(12, '1012', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(13, '1013', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(14, '1014', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),
    createData(15, '1015', '24.09.2020 12:59:59', "kievHosting", "1:59:59", 0.6, 'eye'),


];

/**
 * TasksTab - creates table with current render job details
 * @function
 * @author Andrii Demchyshyn
 */
const TasksTab = React.forwardRef((props: TasksTabProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box>
            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h5" className={clsx(classes.textMain, className)}>
                        Tasks
                    </Typography>
                </Grid>
                <Grid item xs={2} className={clsx(classes.box, className)}>
                    <IconButton className={clsx(classes.iconButton, className)}>
                        <FilterListIcon/>
                    </IconButton>
                    <IconButton className={clsx(classes.iconButton, className)}>
                        <MoreVertIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Frame</TableCell>
                                <TableCell align="left">Start Time</TableCell>
                                <TableCell align="left">Slave</TableCell>
                                <TableCell align="left">Elapsed Time</TableCell>
                                <TableCell align="left" className={classes.progress}>Progress</TableCell>
                                <TableCell align="left"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={key}
                                    >
                                        <TableCell component="th" scope="row">{row.idTable}</TableCell>
                                        <TableCell align="left">{row.frame}</TableCell>
                                        <TableCell align="left">{row.startTime}</TableCell>
                                        <TableCell align="left">{row.slave}</TableCell>
                                        <TableCell align="left">{row.elapsedTime}</TableCell>
                                        <TableCell align="left">
                                            {isWidthUp('md', props.width) ? (<Progress />) : ("10%")}
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
});
TasksTab.displayName = "TasksTable";
TasksTab.propTypes = {}

export default withWidth()(withStyles(styles)(TasksTab));