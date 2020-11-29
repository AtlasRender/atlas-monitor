/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React, {Ref} from 'react';
import styles from "./styles";
import {withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import useAuth from "../../hooks/useAuth";
import MainPageLayout from "../MainPageLayout";
import {ChangeRouteProvider} from "routing-manager";
import MonitorLayout from "../MonitorLayout";

/**
 * ChooseLayoutProps - interface for ChooseLayout component
 * @interface
 * @author Andrii Demchyshyn
 */
interface ChooseLayoutProps extends Stylable {

}

/**
 * ChooseLayout - switches between main pages for new and registered users
 * @function
 * @author Andrii Demchyshyn
 */
const ChooseLayout = React.forwardRef((props: ChooseLayoutProps, ref: Ref<any>) => {
    const {getUser, isLogged} = useAuth();
    const user = getUser();
    return (
        <React.Fragment>
            <ChangeRouteProvider routeMask="(/:page)">
                {user ?
                    <MonitorLayout/>
                    :
                    <MainPageLayout/>
                }
            </ChangeRouteProvider>
            {/*<MonitorLayout/>*/}
        </React.Fragment>
    );
});

export default withStyles(styles)(ChooseLayout);
