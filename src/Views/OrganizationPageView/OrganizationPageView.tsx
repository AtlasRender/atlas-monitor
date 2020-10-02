/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 17:19
 * All rights reserved.
 */

import React, {Ref} from "react";
import {withStyles} from "@material-ui/core";
import {IconButton,
    Avatar,
    Grid,
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    GridList,
    ListItemSecondaryAction,
}
from "@material-ui/core";
import styles from "./styles";
import DataTextField from "../../Components/DataTextField";
import clsx from "clsx";
import TopicWithButton from "./LocalComponents/TopicWithButton";
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';


interface OrganizationPageViewPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const OrganizationPageView = React.forwardRef((props: OrganizationPageViewPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return(
        <Box>
            <Box className={classes.container}>
                <Grid container className={classes.firstLine}>
                    <Grid item xs={8}>
                        <Box>
                            <Grid container spacing={2} className={classes.nameDescription}>
                                <Grid item xs={6}>
                                    <DataTextField label="Organization name" children="Blizzard entertainment"/>
                                </Grid>
                                <Grid item xs={6}/>
                                <Grid item xs={10}>
                                    <DataTextField label="description" children="Lorem ipsum"/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                        <Grid item xs={2}>
                            <Avatar className={classes.avatar}/>
                        </Grid>
                </Grid>
            </Box>
            <TopicWithButton children="Slaves"/>
            <Grid container className={classes.firstLine}>
                <Grid item xs={10}>
                    <ListItem>
                        <ListItemIcon>
                            <BuildIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Kiev slave"/>
                        <ListItemSecondaryAction>
                            <IconButton><SettingsIcon/></IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Grid>
            </Grid>
            {/*<Grid container className={classes.firstLine}>*/}
            {/*    <Grid item xs={10} className={classes.itemsRowBackground}>*/}
            {/*        <IconButton><BuildIcon/></IconButton>*/}
            {/*        <DataTextField label="Slave name" children="Kiev slave"/>*/}

            {/*    </Grid>*/}
            {/*</Grid>*/}

        </Box>
    );
})

export default withStyles(styles)(OrganizationPageView)