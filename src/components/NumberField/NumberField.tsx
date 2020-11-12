/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {useState} from 'react';
import NumberFormat from 'react-number-format';
import Stylable from "../../interfaces/Stylable";
import {Box, TextField, withStyles} from "@material-ui/core";
import styles from "./styles";

/**
 * NumberFieldProps - interface for NumberField component
 * @interface
 * @author Andrii Demchyshyn
 */
interface NumberFieldProps extends Stylable {
}

/**
 * NumberField - creates component which contains only numbers
 * @function
 * @author Andrii Demchyshyn
 */
const NumberField = React.forwardRef((props: NumberFieldProps, ref: React.Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const [value, setValue] = useState();

    const handleValueChange = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <Box className={classes.root}>
            <TextField
                type="number"
                label="Number field"
                value={value}
                onChange={handleValueChange}
                name="number format"
                id="formatted-number-format-input"
                InputProps={{inputComponent: NumberFormat as any}}
                InputLabelProps={{shrink: true}}
            />
        </Box>
    );
});

export default withStyles(styles)(NumberField);