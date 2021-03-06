/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref, useEffect} from "react";
import styles from "./styles";
import {Box, withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import Header from "../../components/Header";
import Toolbar from "@material-ui/core/Toolbar";
import {Route, Switch, useLocation} from "react-router-dom";
import AuthorizationPageView from "../../views/AuthorizationPageView/AuthorizationPageView";
import SignUpPage from "../../views/SignUpPage/SignUpPage";
import {ChangeRouteProvider, useChangeRoute} from "routing-manager";

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

    const {changeRoute} = useChangeRoute();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            changeRoute({page: "authorization", id: null});
        }
    }, []);

    return (
        <Box>
            <Header/>
            <main>
                <Toolbar/>
                <Switch>
                    <Route path="/authorization">
                        <ChangeRouteProvider routeMask="(/:id)">
                            <AuthorizationPageView/>
                        </ChangeRouteProvider>
                    </Route>
                    <Route path="/signUp">
                        <ChangeRouteProvider routeMask="(/:id)">
                            <SignUpPage/>
                        </ChangeRouteProvider>
                    </Route>
                </Switch>
            </main>
        </Box>
    );
});

export default withStyles(styles)(MainPageLayout);