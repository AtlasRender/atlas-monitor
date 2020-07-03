import React from "react";
import Table from "@material-ui/core/Table";
import {useStyles} from "./style";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";


import RenderJob from "../../Entities/RenderJob";

const rows: RenderJob[] = [
    new RenderJob({id: 1, submitter: 'Ivan', department: 'Blizzard'}),
    new RenderJob({})
];

export default function JobsListPanel() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Submitter</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Submit Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.submitter}
                            </TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.submitDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}