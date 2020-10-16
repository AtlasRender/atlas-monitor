/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 11:19
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Box, Divider, Grid, IconButton, Typography, withStyles, useTheme, useMediaQuery} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./styles";
import DataTextField from "../../../../components/DataTextField/DataTextField";
import Stylable from "../../../../interfaces/Stylable";

/**
 * TokensViewerPropsStyled - interface for TokensViewer function
 * @interface
 * @author Nikita Nesterov
 */
interface TokensViewerProps extends Stylable {
    description?: string,
    token?: string,
}

/**
 * TokensViewer - function for UserPageView component used for fast output(creation) of tokens and their description
 * @function
 * @author Nikita Nesterov
 */
const TokensViewer = React.forwardRef((props: TokensViewerProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        description,
        token,
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {setIsOpen(!isOpen);}

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    let tokenView;
    if (matches) {
        tokenView = (
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs={6}>
                    <DataTextField label="Description" children={description}/>
                </Grid>
                <Grid item xs={4}>
                    <DataTextField label="Token" children={token}/>
                </Grid>
            </Grid>
        )
    } else {
        tokenView = (
            <Grid container spacing={2} className={clsx(classes.container, className)}>
                <Grid item xs={10}>
                    <DataTextField label={description} children={token}/>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box>
            {tokenView}
        </Box>
    );
})

export default withStyles(styles)(TokensViewer)
