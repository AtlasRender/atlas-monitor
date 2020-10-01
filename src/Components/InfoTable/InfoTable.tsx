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
    id: 'cellName' | 'cellContent';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    format?: (value: number) => string;
}

interface InfoTablePropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const columns: Column[] = [
    {
        id: 'cellName',
        label: '',
        minWidth: 300
    },
    {
        id: 'cellContent',
        label: '',
        minWidth: 300
    },
];

interface Data {
    cellName: string
    cellContent: string;
}

function createData(cellName: string, cellContent: string): Data {
    return {cellName, cellContent};
}

const rows = [
    createData('Name', 'Pathfinder Logo'),
    createData('Submitter', 'Danil Andreev'),
    createData('Organisation', 'Blizzard Entertainment'),
    createData('Description', 'Lorem ipsu lalalalalalallalasdfdgfsdfghsdfghsdfghhsdfghsfkjghskfjghksfghskdfghsfgjhs'),
    createData('Status', 'Done'),
    createData('Frames', '400 - 800'),
    createData('Priority', '1'),
    createData('Competing tasks', '2'),
    createData('Submission time', '23.09.2020 12.59.20'),
    createData('Finish time', '24.09.2020 12.59.20'),
    createData('Plugin', 'Plug In Name'),
];

/**
 * RenderJobsTable - render jobs table
 * @function
 * @author Andrii Demchyshyn
 */
const InfoTable = React.forwardRef((props: InfoTablePropsStyled, ref: Ref<any>) => {
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.cellName}>
                                        <TableCell component="th" scope="row">{row.cellName}</TableCell>
                                        <TableCell align="left">{row.cellContent}</TableCell>
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
InfoTable.displayName = "TasksTable";
InfoTable.propTypes = {}

export default withStyles(styles)(InfoTable);