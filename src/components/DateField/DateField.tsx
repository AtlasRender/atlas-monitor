/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Stylable from "../../interfaces/Stylable";
import {withStyles} from "@material-ui/core";
import styles from "./styles";

/**
 * DateFieldProps - interface for DateField component
 * @interface
 * @author Andrii Demchyshyn
 */
interface DateFieldProps extends Stylable {
}

/**
 * DateField - creates component where you can choose date
 * @function
 * @author Andrii Demchyshyn
 */
const DateField = React.forwardRef((props: DateFieldProps, ref: React.Ref<any>) => {
    const {
        classes,
        className
    } = props;

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date("2014-08-18T21:11:54"),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}
            />
        </MuiPickersUtilsProvider>
    );
});

export default withStyles(styles)(DateField);