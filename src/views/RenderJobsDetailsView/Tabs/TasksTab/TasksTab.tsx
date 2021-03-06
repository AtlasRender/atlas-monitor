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
import VisibilityIcon from "@material-ui/icons/Visibility";
import {Box, Grid, IconButton, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Progress from "../../../../components/Progress";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";
import Stylable from "../../../../interfaces/Stylable";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Task from "../../../../entities/Task";
import useCoreRequest from "../../../../hooks/useCoreRequest";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";
import {format} from "date-fns";
import {useChangeRoute} from "routing-manager";
import DialogTaskLogs from "../../LocalComponents/DialogTaskLogs";
import ShortJobs from "../../../../entities/ShortJobs";
import CoreEventDispatcher from "../../../../core/CoreEventDispatcher";
import {WS_RENDER_TASK_UPDATE} from "../../../../globals";
import useAuth from "../../../../hooks/useAuth";
import ErrorHandler from "../../../../utils/ErrorHandler";

/**
 * TasksTabProps - interface for TasksTab component
 * @interface
 * @author Andrii Demchyshyn
 */
interface TasksTabProps extends Stylable {
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
 * TasksTab - creates table with current render job details
 * @function
 * @author Andrii Demchyshyn
 */
const TasksTab = React.forwardRef((props: TasksTabProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;


    const {logout} = useAuth();
    const coreRequest = useCoreRequest();
    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const {getRouteParams} = useChangeRoute();
    const {panel} = getRouteParams();


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(0);


    useEffect(() => {

        console.log("adding event listener");

        const updateListener = (message: any) => {
            console.log("Update TASK Listener");
            coreRequest()
                .get(`tasks/${message.id}`)
                .then(res => {
                    console.log("Task:", res.body);
                    console.log("MessageID:", message.id);
                    setTasks(prev => {
                        const taskIndex = prev.findIndex(task => task.id === message.id);
                        if (taskIndex >= 0) {
                            prev[taskIndex] = new Task(res.body);
                        }
                        return [...prev];
                    });
                })
                .catch(err => {
                    enqueueErrorSnackbar("Cant update tasks");
                });
        };

        CoreEventDispatcher.getInstance().addListener(WS_RENDER_TASK_UPDATE, updateListener);

        handleGetTasks();

        return () => {
            CoreEventDispatcher.getInstance().removeListener(WS_RENDER_TASK_UPDATE, updateListener);
        }

    }, []);


    const handleGetTasks = () => {
        coreRequest()
            .get(`jobs/${panel}/tasks`)
            .then(response => {
                if (Array.isArray(response.body)) {
                    try {
                        console.log(response.body);
                        setTasks(response.body.map(item => new Task(item)));
                    } catch (err) {
                        enqueueErrorSnackbar("Invalid data types");
                    }
                }
            })
            .catch(err => {
                const errorHandler = new ErrorHandler(enqueueErrorSnackbar);
                errorHandler
                    .on(401, () => {logout()})
                    .on(403, "You don't have permissions to this data")
                    .on(404, "Render job not found")
                    .handle(err);
            });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenDialog = (id: number) => {
        setCurrentTaskId(id);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
            <Paper elevation={0} className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell} align="left">Id</TableCell>
                                <TableCell className={classes.cell} align="left">Frame</TableCell>
                                <TableCell className={classes.cell} align="left">Start Time</TableCell>
                                <TableCell className={classes.cell} align="left">Slave</TableCell>
                                <TableCell className={classes.cell} align="left">Elapsed Time</TableCell>
                                <TableCell align="left" className={classes.progress}>Progress</TableCell>
                                <TableCell className={classes.cell} align="left"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, key) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={key}
                                    >
                                        <TableCell component="th" scope="row">{task.id}</TableCell>
                                        <TableCell align="left">{task.frame}</TableCell>
                                        <TableCell align="left">{format(task.createdAt, "dd.MM.yyyy hh:mm")}</TableCell>
                                        <TableCell align="left">Slave</TableCell>
                                        <TableCell align="left">{format(task.createdAt, "dd.MM.yyyy hh:mm")}</TableCell>
                                        <TableCell align="left">
                                            {isWidthUp("md", props.width) ? (<Progress progress={task.status === "done" ? 100 : task.progress}/>) : ("10%")}
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton className={classes.iconVisible} onClick={() => handleOpenDialog(task.id)}>
                                                <VisibilityIcon/>
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
                    count={tasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>


            <DialogTaskLogs
                open={openDialog}
                onClose={handleCloseDialog}
                taskId={currentTaskId}
            />


        </Box>
    );
});
TasksTab.displayName = "TasksTable";
TasksTab.propTypes = {};

export default withWidth()(withStyles(styles)(TasksTab));
