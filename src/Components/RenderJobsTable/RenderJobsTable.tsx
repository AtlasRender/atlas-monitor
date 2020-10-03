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
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import styles from "./styles";
import clsx from "clsx";
import Progress from "../Progress";
import {useChangeRoute} from "routing-manager";
import Stylable from "../../Interfaces/Stylable";

/**
 * RenderJobsTableProps - interface for RenderJobsTable component
 * @interface
 * @author Andrii Demchyshyn
 */
interface RenderJobsTableProps extends Stylable{
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
     * name - name of table component
     * @type string
     */
    name: string;
    /**
     * submitter - table component submitters name
     * @type string
     */
    submitter: string;
    /**
     * organisation - organisation name of table component
     * @type string
     */
    organisation: string;
    /**
     * date - submission date and time of table component
     * @type string
     */
    date: string;
    /**
     * progress - implementation progress of table component
     * @type number
     */
    progress: number;
}

/**
 * createData - creates table row
 * @param idTable
 * @param name
 * @param submitter
 * @param organisation
 * @param date
 * @param progress
 * @function
 * @author Andrii Demchyshyn
 */
function createData(idTable: number, name: string, submitter: string, organisation: string, date: string, progress: number): Data {
    return {idTable, name, submitter, organisation, date, progress};
}

/**
 * rows - array of table rows
 * @type string
 * @type number
 */
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
 * RenderJobsTable - creates table with render jobs
 * @function
 * @author Andrii Demchyshyn
 */
const RenderJobsTable = React.forwardRef((props: RenderJobsTableProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {changeRoute} = useChangeRoute();

    /**
     * handleChangePage - let go to next page
     * @param event
     * @param newPage
     * @function
     * @author Andrii Demchyshyn
     */
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    /**
     * handleChangeRowsPerPage - sets number of table rows per page
     * @param event
     * @function
     * @author Andrii Demchyshyn
     */
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box className={className}>
            <Typography variant="h5" className={clsx(classes.textMain)}>
                Render Jobs
            </Typography>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Submitter</TableCell>
                                <TableCell align="left">Organisation</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left" className={classes.progress}>Progress</TableCell>
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
                                        onClick={() => changeRoute({panel: "jobDetails"})}
                                    >
                                        <TableCell component="th" scope="row">{row.idTable}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.submitter}</TableCell>
                                        <TableCell align="left">{row.organisation}</TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        <TableCell align="left" >
                                            {isWidthUp('md', props.width) ? (<Progress />) : ("10%")}
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

export default withWidth()(withStyles(styles)(RenderJobsTable));