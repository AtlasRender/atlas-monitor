/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 01.10.2020, 18:21
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
import TableRow from '@material-ui/core/TableRow'
import {Box, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Progress from "../Progress";

interface Column {
    id: 'idTable' | 'name' | 'submitor' | 'organisation' | 'date' | 'progress';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    format?: (value: number) => string;
}

interface RenderJobsTablePropsStyled {
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
        id: 'name',
        label: 'Name',
        minWidth: 100
    },
    {
        id: 'submitor',
        label: 'Submitor',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'organisation',
        label: 'Organisation',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'progress',
        label: 'Progress',
        minWidth: 150,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    idTable: number
    name: string;
    submitor: string;
    organisation: string;
    date: string;
    progress: number;
}

function createData(idTable: number, name: string, submitor: string, organisation: string, date: string, progress: number): Data {
    return {idTable, name, submitor, organisation, date, progress};
}

const rows = [
    createData(1, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(2, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(3, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(4, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(5, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(6, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(7, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(8, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(9, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(10, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(11, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(12, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(13, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(14, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
    createData(15, 'Pathfinder Logo', 'Danil Andreev', "Blizzard Entertainment", "24.09.2020 12:59:59", 0.6),
];

/**
 * RenderJobsTable - render jobs table
 * @function
 * @author Andrii Demchyshyn
 */
const RenderJobsTable = React.forwardRef((props: RenderJobsTablePropsStyled, ref: Ref<any>) => {
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
                Render Jobs
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                        <TableCell component="th" scope="row">{row.idTable}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.submitor}</TableCell>
                                        <TableCell align="left">{row.organisation}</TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        <TableCell align="left">
                                            <Progress/>
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
RenderJobsTable.displayName = "RenderJobsTable";
RenderJobsTable.propTypes = {}

export default withStyles(styles)(RenderJobsTable);