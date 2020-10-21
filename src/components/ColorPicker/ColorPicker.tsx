/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 21.10.2020, 11:44
 * All rights reserved.
 */

import React, {useState} from "react";
import {Box, InputBase, List, ListItem, useMediaQuery, useTheme, withStyles} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Stylable from "../../interfaces/Stylable";
import {grey, red} from "@material-ui/core/colors";


interface ColorPickerProps extends Stylable {

}

const ColorPicker = React.forwardRef((props: ColorPickerProps, ref: React.Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const theme = useTheme();
    const defaultColors = ['FF6900', 'FCB900', '00D084', '8ED1FC', '0693E3', 'ABB8C3', 'EB144C', 'F78DA7', '9900EF'];
    const [color, setColor] = useState("FFF");
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [error, setError] = useState(false);

    function handleChangeColor(newColor: string, id: number) {
        setColor(newColor);
        setError(false);
        setCurrentId(id);
    }

    function handleChangeColorInput(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentId(null);
        setColor(event.target.value);
    }

    function isValidHex(color: string) {
        if (!color) return false;

        if (color.substring(0, 1) === '#') color = color.substring(1);

        switch (color.length) {
            case 3:
                return /^[0-9A-F]{3}$/i.test(color);
            case 4:
                return /^[0-9A-F]{4}$/i.test(color);
            case 6:
                return /^[0-9A-F]{6}$/i.test(color);
            case 8:
                return /^[0-9A-F]{8}$/i.test(color);
            default:
                return false;
        }

        return false;
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
        width = "auto"
    } else {
        width = "100%"
    }

    return (
        <List className={clsx(classes.container, className)}>
            <Box className={classes.defaultContainer}>
                {defaultColors.map((color, key) => {
                    return (
                        <ListItem
                            key={key}
                            button
                            className={classes.color}
                            style={currentId === key ? {background: `#${color}`, boxShadow: `#${color} 0px 0px 6px`} :
                                {background: `#${color}`}
                            }
                            onClick={() => handleChangeColor(color, key)}
                        />

                    );
                })}
            </Box>
            <Box className={classes.inputContainer} style={{width: width}}>
                <Box
                    className={classes.inputAdornment}
                    style={{background: `#${color}`}}
                >
                    #
                </Box>
                <InputBase
                    onChange={handleChangeColorInput}
                    className={classes.input}
                    value={color}
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