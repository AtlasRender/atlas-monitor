/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 16.10.2020, 22:33
 * All rights reserved.
 */

import React, {Ref} from 'react';
import styles from "./styles";
import {Box, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import Header from "../../components/Header";
import Toolbar from "@material-ui/core/Toolbar";
import {Route, Switch} from "react-router-dom";
import RenderJobsView from "../../views/RenderJobsView/RenderJobsView";
import RenderJobsDetailsView from "../../views/RenderJobsDetailsView/RenderJobsDetailsView";
import UserPageView from "../../views/UserPageView/UserPageView";
import OrganizationPageView from "../../views/OrganizationPageView/OrganizationPageView";
import SubmitPageView from "../../views/SubmitPageView/SubmitPageView";
import AuthorizationPageView from "../../views/AuthorizationPageView/AuthorizationPageView";
import SignUpPage from "../../views/SignUpPage/SignUpPage";

/**
 * MainPageLayoutProps - interface for MainPageLayout component
 * @interface
 * @author Andrii Demchyshyn
 */
interface MainPageLayoutProps extends Stylable {

}

/**
 * MainPageLayout - creates main static part of page while user is not registered or logged in
 * @function
 * @author Andrii Demchyshyn
 */
const MainPageLayout = React.forwardRef((props: MainPageLayoutProps, ref: Ref<any>) => {
    const {
        classes,
        className,
    } = props;

    return (
        <Box className={classes.root}>
            <Header/>

            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    <Route path="/pages/authorization">
                        <AuthorizationPageView/>
                    </Route>
                    <Route path="/pages/signUp">
                        <SignUpPage/>
                    </Route>
                </Switch>
            </main>
        </Box>
    );
});

export default withStyles(styles)(MainPageLayout);