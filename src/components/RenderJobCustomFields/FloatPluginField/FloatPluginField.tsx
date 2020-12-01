/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 22:16
 * All rights reserved.
 */

import React, {ChangeEvent, Ref, useState} from "react";
import {
    Box,
    Button,
    Grid,
    InputBase,
    ListItem,
    ListItemText,
    Slider,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import Stylable from "../../../interfaces/Stylable";
import styles from "./styles";
import validate from "validate.js";
import {number} from "prop-types";
import {IntegerField} from "@atlasrender/render-plugin";

interface IntegerPluginFieldProps extends Stylable {
    field: IntegerField;
    value?: number,

    onChange?(value: number | null): void;
}

const FloatPluginField = React.forwardRef((props: IntegerPluginFieldProps, ref: Ref<HTMLElement>) => {
    const {
        classes,
        className,
        style,
        field,
        onChange,
        value: inputValue,
    } = props;

    const [value, setValue] = React.useState<string>("");
    const [slider, setSlider] = React.useState<boolean>(true);
    const [finalValue, setFinalValue] = React.useState<number | null>(field.default || null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    //TODO: update from props value!


    React.useEffect(() => {
        setValue(String(finalValue));
        onChange && onChange(finalValue);
    }, [finalValue]);


    // function checkForValidation(){
    //     if(!validate.isInteger(+value)){
    //         setValue(finalValue);
    //         return;
    //     }else if(field?.min && field?.max && (value < field.min || value > field.max)){
    //         setValue(finalValue);
    //         return;
    //     }else if(field?.min && value < field?.min){
    //         setValue(finalValue);
    //         return;
    //     }else if(field?.max && value > field?.max){
    //         setValue(finalValue);
    //         return;
    //     }
    //     else{
    //         setFinalValue(+value);
    //     }
    // }

    return (
        <Grid container>
            <Grid item xs={3}>
                <Button
                    fullWidth
                    onClick={() => setSlider(prev => !prev)}
                >
                    Samples
                </Button>
            </Grid>
            <Grid item xs={slider ? 2 : 9}>
                <InputBase
                    ref={inputRef}
                    value={value}
                    fullWidth
                    className={classes.field}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={() => {
                        if (isNaN(+value))
                            setValue(String(finalValue || ""));
                        else
                            setFinalValue(+value);
                    }}
                    onKeyPress={(event) => {
                        if (event.key === "Enter" && inputRef.current)
                            inputRef.current.blur();
                    }}
                />
            </Grid>
            {slider &&
            <Grid item xs={7}>
                <Slider
                    defaultValue={30}
                    value={finalValue || 0}
                    onChange={(event, newValue) => {
                        if (typeof newValue === "number")
                            setFinalValue(newValue);
                    }}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="off"
                    marks
                    min={field.min}
                    max={field.max}
                />
            </Grid>
            }
        </Grid>
    );
})

export default withStyles(styles)(FloatPluginField);