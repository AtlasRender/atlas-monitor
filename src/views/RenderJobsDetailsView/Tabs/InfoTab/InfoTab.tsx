/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React, {Ref} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Box, Grid, IconButton, Typography, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import DataTextField from "../../../../components/DataTextField/DataTextField";
import Stylable from "../../../../interfaces/Stylable";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreVertIcon from "@material-ui/icons/MoreVert";

/**
 * InfoTabProps
 * @interface
 * @author Andrii Demchyshyn
 */
interface InfoTabProps extends Stylable{
}

/**
 * Data - interface for createData function
 * @interface
 * @author Andrii Demchyshyn
 */
interface Data {
    /**
     * cellName - name of cell
     * @type string
     */
    cellName: string
    /**
     * cellContent - content of cell
     * @type string
     */
    cellContent: string;
}

/**
 * createData - creates table row
 * @param cellName
 * @param cellContent
 * @function
 * @author Andrii Demchyshyn
 */
function createData(cellName: string, cellContent: string): Data {
    return {cellName, cellContent};
}

/**
 * rows - array of table rows
 * @type string
 * @type number
 */
const rows = [
    createData('Name', 'Pathfinder Logo'),
    createData('Submitter', 'Danil Andreev'),
    createData('Organisation', 'Blizzard Entertainment'),
    createData('Description', 'Lorem ipsu lalalalalalallalasdfdgfsdfghsdfghsd '),
    createData('Status', 'Done'),
    createData('Frames', '400 - 800'),
    createData('Priority', '1'),
    createData('Competing tasks', '2'),
    createData('Submission time', '23.09.2020 12.59.20'),
    createData('Finish time', '24.09.2020 12.59.20'),
    createData('Plugin', 'Plug In Name'),
];

/**
 * InfoTab -  creates table with detailed information about render job
 * @function
 * @author Andrii Demchyshyn
 */
const InfoTab = React.forwardRef((props: InfoTabProps, ref: Ref<any>) => {
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

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    let table;

    if(matches) {
        table = (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h5" className={clsx(classes.textMain, className)}>
                            Detailed Information
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
                <Paper elevation={0} className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
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
            </React.Fragment>
        );
    } else {
        table = (
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DataTextField label="Name" children="Pathfinder Logo"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Submitter" children="Danil Andreev"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Organisation" children="Blizzard Entertainment"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Priority" children="1"/>
                    </Grid>

                    <Grid item xs={12}>
                        <DataTextField label="Status" children="Done"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Submission date" children="25.09.2020 12.59.20"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Finish date" children="29.09.2020 12.59.20"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Frames" children="400 - 800"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Competing tasks" children="2"/>
                    </Grid>

                    <Grid item xs={12}>
                        <DataTextField
                            label="Description"
                            children="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum sodales risus vitae
                            fermentum. Pellentesque hendrerit ultricies libero et lacinia. Integer sed ultricies velit.
                            Sed dui orci, lacinia fermentum lacus vitae, maximus pretium ante."
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DataTextField label="Plugin" children="Plug In Name"/>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <Box>
            {table}
        </Box>
    );
});
InfoTab.displayName = "TasksTable";
InfoTab.propTypes = {}

export default withStyles(styles)(InfoTab);
