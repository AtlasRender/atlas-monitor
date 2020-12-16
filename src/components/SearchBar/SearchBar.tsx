/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 16.12.2020, 18:57
 * All rights reserved.
 */

import React from "react";
import {FormControl, InputAdornment, InputBase, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import styles from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";

interface SearchBarProps extends Stylable {

}

const SearchBar = React.forwardRef((props: SearchBarProps, ref) => {
    const {
        classes,
        className,
        style,
    } = props;


    return (
        <FormControl style={{width: "100%"}}>
            <InputBase
                className={classes.searchInput}
                placeholder="Search…"
                endAdornment={
                    <InputAdornment position="end">
                        <CloseIcon
                            className={classes.iconSearch}
                        />
                    </InputAdornment>
                }
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            />
        </FormControl>
    );
});

export default withStyles(styles)(SearchBar);