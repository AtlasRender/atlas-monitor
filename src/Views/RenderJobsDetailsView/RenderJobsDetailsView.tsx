/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 30.09.2020, 17:14
 * All rights reserved.
 */

import React, {Ref} from 'react';
import {Box, Typography, Divider, withStyles, Grid} from "@material-ui/core";
import styles from "./styles";
import clsx from "clsx";
import Progress from "../../Components/Progress";
import CustomTabs from "../../Components/CustomTabs";
import CustomTabsPanel from "../../Components/CustomTabsPanel";
import {useTheme} from "@material-ui/core/styles";
import TasksTable from "../../Components/TasksTable";
import InfoTable from "../../Components/InfoTable";
import DataTextField from "../../Components/DataTextField";

interface RenderJobsDetailsViewPropsStyled {
    classes?: any;
    style?: any;
    className?: string;
}

const RenderJobsDetailsView = React.forwardRef((props: RenderJobsDetailsViewPropsStyled, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box>
            <Typography variant="subtitle2" className={clsx(classes.pathText, className)}>
                Renders Jobs / Pathfinder Logo
            </Typography>
            <Typography variant="h4" className={clsx(classes.mainText, className)}>
                Pathfinder Logo
            </Typography>
            <Progress className={clsx(classes.progressMargin, className)}/>
            <Typography variant="h6">
                General
            </Typography>
            <Divider className={clsx(classes.dividerMargin, className)}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <DataTextField label="Name" children="Pathfinder Logo"/>
                </Grid>
                <Grid item xs={3}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Submiter
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            Danil Andreev
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Organisation
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            Blizzard Entertainment
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Priority
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            1
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Submission date
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            25.09.2020 12.59.20
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Status
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            Done
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Frames
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            400 - 800
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}/>
                <Grid item xs={1}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Competing tasks
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            2
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Finish date
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            29.09.2020 12.59.20
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Description
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum sodales risus vitae
                            fermentum. Pellentesque hendrerit ultricies libero et lacinia. Integer sed ultricies velit.
                            Sed dui orci, lacinia fermentum lacus vitae, maximus pretium ante.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Typography variant="h6" className={clsx(classes.pluginMargin, className)}>
                Plugin
            </Typography>
            <Divider className={clsx(classes.dividerMargin, className)}/>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Name
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            Plug in Name
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Version
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            ver.1.22474487139...
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className={clsx(classes.boxContainer, className)}>
                        <Typography className={clsx(classes.boxContainerTitle, className)}>
                            Description
                        </Typography>
                        <Typography className={clsx(classes.boxContainerText, className)}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum sodales risus vitae
                            fermentum. Pellentesque hendrerit ultricies libero et lacinia. Integer sed ultricies velit.
                            Sed dui orci, lacinia fermentum lacus vitae, maximus pretium ante.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <CustomTabs
                value={value}
                onChange={handleChange}
                onChangeIndex={handleChangeIndex}
                className={clsx(classes.customTabsMargin, className)}
            >
                <CustomTabsPanel value={value} index={0} dir={theme.direction}>
                    <TasksTable />
                </CustomTabsPanel>
                <CustomTabsPanel value={value} index={1} dir={theme.direction}>
                    <InfoTable />
                </CustomTabsPanel>
                <CustomTabsPanel value={value} index={2} dir={theme.direction}>
                    Table 3
                </CustomTabsPanel>
            </CustomTabs>
        </Box>
    );
});
RenderJobsDetailsView.displayName = "RenderJobsDetailsView";
RenderJobsDetailsView.propTypes = {}

export default withStyles(styles)(RenderJobsDetailsView);