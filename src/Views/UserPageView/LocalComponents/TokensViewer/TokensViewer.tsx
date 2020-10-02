/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 11:19
 * All rights reserved.
 */

import React from "react";
import {Grid, IconButton, Divider, Typography, withStyles} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataTextField from "../../../../Components/DataTextField";
import styles from "./styles";

interface TokensViewerPropsStyled{
    classes?: any,
    style?:any,
    className?: string,
}

const TokensViewer = React.forwardRef((props: TokensViewerPropsStyled)=>{
    const{
        classes,
        style,
        className,
    }=props;

    return(
        <Grid container className={clsx(classes.container, className)}>
            <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography variant="h6">Tokens</Typography>
                        </Grid>
                        <Grid item xs={1} className={clsx(classes.box, className)}>
                            <IconButton children={<ExpandMoreIcon/>}/>
                        </Grid>
                    </Grid>
            </Grid>
            <Grid item xs ={10}>
                <Divider/>
            </Grid>
        </Grid>
    );
})

export default withStyles(styles)(TokensViewer)
