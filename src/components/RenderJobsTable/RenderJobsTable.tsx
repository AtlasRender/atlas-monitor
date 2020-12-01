/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {Box, Grid, IconButton, Typography, useTheme, withStyles} from "@material-ui/core";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";
import styles from "./styles";
import clsx from "clsx";
import Progress from "../Progress";
import {useChangeRoute} from "routing-manager";
import Stylable from "../../interfaces/Stylable";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useCoreRequest from "../../hooks/useCoreRequest";

import {format} from "date-fns";
import ShortJobs from "../../entities/ShortJobs";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import Loading from "../Loading";
import {blue, green, orange, red, yellow} from "@material-ui/core/colors";

/**
 * RenderJobsTableProps - interface for RenderJobsTable component
 * @interface
 * @author Andrii Demchyshyn
 */
interface RenderJobsTableProps extends Stylable {
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
 * RenderJobsTable - creates table with render jobs
 * @function
 * @author Andrii Demchyshyn
 */
const RenderJobsTable = React.forwardRef((props: RenderJobsTableProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;


    const coreRequest = useCoreRequest();
    const {changeRoute} = useChangeRoute();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const theme = useTheme();


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [jobs, setJobs] = useState<ShortJobs[]>([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        Promise.all([
            handleGetJobs(),
        ]).then(() => {
            setLoaded(true);
        });
    }, []);


    async function handleGetJobs() {
        try {
            const response = await coreRequest().get("jobs");
            if (Array.isArray(response.body)) {
                let entity: ShortJobs[] = [];
                console.log(response.body);
                try {
                    response.body.forEach(item => {
                        console.log(item);
                        entity.push(new ShortJobs(item));
                    });
                } catch (err) {
                    enqueueErrorSnackbar("Invalid data types");
                }
                setJobs(entity);
            }
        } catch (err) {
            enqueueErrorSnackbar("Cant get render jobs");
        }
    }

    function handleSetStatusColor(status: string) {
        if (status === "done") {
            return green[400];
        } else if (status === "failed") {
            return theme.palette.error.dark;
        } else if (status === "inProgress") {
            return blue[200];
        } else if (status === "inQueue") {
            return orange[300];
        } else {
            return "#fff";
        }
    }

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
        loaded ?
            <Box className={className}>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography variant="h5" className={clsx(classes.textMain)}>
                            Render Jobs
                        </Typography>
                    </Grid>
                    <Grid item xs={1} className={clsx(classes.box, className)}>
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
                                    <TableCell className={classes.cell} align="left">Id</TableCell>
                                    <TableCell className={classes.cell} align="left">Name</TableCell>
                                    <TableCell className={classes.cell} align="left">Submitter</TableCell>
                                    <TableCell className={classes.cell} align="left">Org(frameRange)</TableCell>
                                    <TableCell className={classes.cell} align="left">Date</TableCell>
                                    <TableCell align="left" className={classes.progress}>Progress</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, key) => {
                                    const color = handleSetStatusColor("done");
                                    return (
                                        <TableRow
                                            style={{background: color}}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={key}
                                            onClick={() => changeRoute({panel: `${job.id}`})}
                                        >
                                            <TableCell component="th" scope="row">{job.id}</TableCell>
                                            <TableCell align="left">{job.name}</TableCell>
                                            <TableCell align="left">{job.submitter.username}</TableCell>
                                            <TableCell align="left">{job.frameRange}</TableCell>
                                            <TableCell
                                                align="left">{format(job.createdAt, "dd.MM.yyyy hh:mm")}</TableCell>
                                            <TableCell align="left">
                                                {isWidthUp("md", props.width) ? (<Progress progress={
                                                    ((job.doneTasks) / (job.doneTasks + job.pendingTasks + job.failedTasks + job.processingTasks)) * 100
                                                }/>) : ("10%")}
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
                        count={jobs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            :
            <Box className={classes.loading}>
                <Loading/>
            </Box>
    );
});
RenderJobsTable.displayName = "RenderJobsTable";
RenderJobsTable.propTypes = {};

export default withWidth()(withStyles(styles)(RenderJobsTable));
