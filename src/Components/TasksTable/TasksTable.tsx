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
import {Box, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Progress from "../Progress";

interface Column {
    id: 'idTable' | 'frame' | 'startTime' | 'slave' | 'elapsedTime' | 'progress' | 'icon';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    format?: (value: number) => string;
}

interface TasksTablePropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const columns: Column[] = [
    {
        id: 'idTable',
        label: 'id',
        minWidth: 40
    },
    {
        id: 'frame',
        label: 'Name',
        minWidth: 150
    },
    {
        id: 'startTime',
        label: 'Submitor',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'slave',
        label: 'Organisation',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'elapsedTime',
        label: 'Date',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'progress',
        label: 'Progress',
        minWidth: 150,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'icon',
        label: '',
        minWidth: 50,
        align: 'left'
    },
];

interface Data {
    idTable: number
    frame: string;
    startTime: string;
    slave: string;
    elapsedTime: string;
    progress: number;
    icon: any;
}

function createData(idTable: number, frame: string, startTime: string, slave: string, elapsedTime: string, progress: number, icon: any): Data {
    return {idTable, frame, startTime, slave, elapsedTime, progress, icon};
}

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
 * RenderJobsTable - render jobs table
 * @function
 * @author Andrii Demchyshyn
 */
const TasksTable = React.forwardRef((props: TasksTablePropsStyled, ref: Ref<any>) => {
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
            <Typography variant="h5" className={clsx(classes.textMain, className)}>
                Tasks
            </Typography>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.idTable}>
                                        <TableCell component="th" scope="row">{row.idTable}</TableCell>
                                        <TableCell align="left">{row.frame}</TableCell>
                                        <TableCell align="left">{row.startTime}</TableCell>
                                        <TableCell align="left">{row.slave}</TableCell>
                                        <TableCell align="left">{row.elapsedTime}</TableCell>
                                        <TableCell align="left">
                                            <Progress/>
                                        </TableCell>
                                        <TableCell align="left">
                                            <VisibilityIcon />
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
TasksTable.displayName = "TasksTable";
TasksTable.propTypes = {}

export default withStyles(styles)(TasksTable);