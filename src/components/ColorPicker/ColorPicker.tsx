/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {useEffect, useState} from "react";
import {Box, InputBase, List, ListItem, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import {grey, red} from "@material-ui/core/colors";


interface ColorPickerProps extends Stylable {
    color?: string;

    onChange?(color: string): void;

    handleGetInvalidColor?(color: string): void;
}

const ColorPicker = React.forwardRef((props: ColorPickerProps, ref: React.Ref<any>) => {
    const {
        classes,
        className,
        onChange,
        color: inputColor,
        handleGetInvalidColor,
    } = props;

    const theme = useTheme();
    const defaultColors = ["FF6900", "FCB900", "00D084", "8ED1FC", "0693E3", "ABB8C3", "EB144C", "F78DA7", "9900EF"];
    const [color, setColor] = useState(inputColor || "FFF");
    const [error, setError] = useState(false);

    console.log(color);

    useEffect(() => {
        if(inputColor && isValidHex(inputColor)) {
            setColor(inputColor);
        } else {
            setColor("f44336");
        }
    }, [inputColor]);

    function handleChangeColor(newColor: string, id: number) {
        !inputColor && setColor(newColor);
        setError(false);
        onChange && onChange(newColor);
    }

    function handleChangeColorInput(event: React.ChangeEvent<HTMLInputElement>) {
        !inputColor && setColor(event.target.value);
        onChange && onChange(event.target.value);
        if(isValidHex("#" + event.target.value)) {
            handleGetInvalidColor && handleGetInvalidColor("FFF");
        } else {
            handleGetInvalidColor && handleGetInvalidColor("f44336");
        }

    }

    function isValidHex(color: string) {
        if (!color) return false;

        if (color.substring(0, 1) === "#") color = color.substring(1);

        switch (color.length) {
            case 3:
                return /^[0-9A-F]{3}$/i.test(color);
            // case 4:
            //     return /^[0-9A-F]{4}$/i.test(color);
            case 6:
                return /^[0-9A-F]{6}$/i.test(color);
            case 8:
                return /^[0-9A-F]{8}$/i.test(color);
            default:
                return false;
        }
    }

    function handleCheckError(event: React.FocusEvent<HTMLInputElement>) {
        let color = `#${event.target.value}`;
        if (isValidHex(color)) {
            setError(false);
        } else {
            setError(true);
        }
    }

    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    let width;
    if (matches) {
        width = "auto";
    } else {
        width = "100%";
    }

    return (
        <List className={clsx(classes.container, className)}>
            <Box className={classes.defaultContainer}>
                {defaultColors.map((defaultColor, key) => {
                    return (
                        <ListItem
                            key={key}
                            button
                            className={classes.color}
                            style={color === defaultColor ? {
                                    background: `#${defaultColor}`,
                                    boxShadow: `#${defaultColor} 0px 0px 8px`
                                } :
                                {background: `#${defaultColor}`}
                            }
                            onClick={() => handleChangeColor(defaultColor, key)}
                        />

                    );
                })}
            </Box>
            <Box className={classes.inputContainer} style={{width: width}}>
                <Box
                    className={classes.inputAdornment}
                    style={{
                        background: `#${color || "FFF"}`, border: `1px solid #${color || "FFF"}`,
                        color: theme.palette.getContrastText(`#${color || "FFF"}`)
                    }}
                >
                    #
                </Box>
                <InputBase
                    onChange={handleChangeColorInput}
                    className={classes.input}
                    value={inputColor}
                    classes={{
                        input: classes.paddingLeft,
                    }}
                    inputProps={{
                        maxLength: 6,
                    }}
                    onBlur={handleCheckError}
                    style={error ? {border: `2px solid ${red[600]}`} : {border: `1px solid ${grey[200]}`}}
                />
            </Box>

        </List>
    );
});

export default withStyles(styles)(ColorPicker);
