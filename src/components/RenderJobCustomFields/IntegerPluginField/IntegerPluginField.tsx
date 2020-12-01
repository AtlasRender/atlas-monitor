/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 22:16
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Button, Grid, InputBase, Slider, withStyles} from "@material-ui/core";
import Stylable from "../../../interfaces/Stylable";
import styles from "./styles";
import {IntegerField, PluginSetting} from "@atlasrender/render-plugin";

interface IntegerPluginFieldProps extends Stylable {
    field: IntegerField;
    value?: number,

    setPluginSetting(field: PluginSetting, value: number | string | null): void,
}

const IntegerPluginField = React.forwardRef((props: IntegerPluginFieldProps, ref: Ref<HTMLElement>) => {
    const {
        classes,
        className,
        style,
        field,
        setPluginSetting,
        value: inputValue,
    } = props;

    const [value, setValue] = React.useState<string>("");
    const [slider, setSlider] = React.useState<boolean>(true);
    const [finalValue, setFinalValue] = React.useState<number | null>(field.default || null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    //TODO: add update fdrom props value!

    React.useEffect(() => {
        setValue(String(finalValue));
        setPluginSetting(field, finalValue);
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
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Button
                    fullWidth
                    onClick={() => setSlider(prev => !prev)}
                >
                    {field.name}
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
                    step={1}
                    min={field.min}
                    max={field.max}
                />
            </Grid>
            }
        </Grid>
    );
});

export default withStyles(styles)(IntegerPluginField);