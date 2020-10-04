/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 04.10.2020, 16:10
 * All rights reserved.
 */

import React, {Ref} from "react";
import {Box, Grid, Typography, withStyles} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";

/**
 * SubmitPagePropsStyled - interface for SubmitPageView function
 * @interface
 * @author Nikita Nesterov
 */
interface SubmitPagePropsStyled extends Stylable{

}

/**
 * SubmitPageView - function for displaying Submit page
 * @function
 * @author Nikita Nesterov
 */
const SubmitPageView = React.forwardRef((props:SubmitPagePropsStyled, ref: Ref<any>)=>{
    const {
        classes,
        style,
        className,
    }=props

   return(
       <Box>
           <Grid container spacing={2} className={classes.container}>
               <Grid item xs={10}>
                   <Typography variant="h6">Submit info</Typography>
               </Grid>
           </Grid>
       </Box>
   );
});

export default withStyles(styles)(SubmitPageView);