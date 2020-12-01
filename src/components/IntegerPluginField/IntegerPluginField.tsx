/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 22:16
 * All rights reserved.
 */

import React, {useState} from "react";
import {Box, Button, ListItem, ListItemText, Slider, TextField, Typography, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";
import IntegerField from "../../entities/IntegerField";
import validate from "validate.js";

interface IntegerPluginFieldProps extends Stylable {
    field?: IntegerField;
    submit?(): void;
}

const IntegerPluginField = React.forwardRef((props: IntegerPluginFieldProps, ref) => {
    const {
        classes,
        className,
        style,
        field,
        submit,
    } = props;

    const [value, setValue] = useState<any>();
    const [isSlider, setIsSlider] = useState<boolean>(false);
    const [finalValue, setFinalValue] = useState<number>(0);

    function changeValue(event: React.ChangeEvent<HTMLInputElement>){
        event.persist();
        setValue(event.target.value);
    }

    function handleSliderChange(event:any, newValue: number | number[]){
        setValue(newValue as number);
        setFinalValue(value);
    }

    function checkForValidation(){
        if(!validate.isInteger(+value)){
            setValue(finalValue);
            return;
        }else if(field?.min && field?.max && (value < field.min || value > field.max)){
            setValue(finalValue);
            return;
        }else if(field?.min && value < field?.min){
            setValue(finalValue);
            return;
        }else if(field?.max && value > field?.max){
            setValue(finalValue);
            return;
        }
        else{
            setFinalValue(+value);
        }
    }

    console.log(value);
    return (
        <React.Fragment>
            <Box className={classes.box}>
                <Button className={classes.button} onClick={()=>setIsSlider(!isSlider)}>Pidor</Button>
                <TextField
                    className={classes.valueField}
                    value={value}
                    placeholder={`${field?.min}-${field?.max}`}
                    onBlur={checkForValidation}
                    onChange={changeValue}
                    type="number"
                />
                {isSlider &&
                    <Slider
                        className={classes.slider}
                        value={value}
                        step={1}
                        min={1}
                        max={255}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                    />
                }
            </Box>
        </React.Fragment>
    );
})

export default withStyles(styles)(IntegerPluginField);