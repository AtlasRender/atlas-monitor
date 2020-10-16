/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 16.10.2020, 22:55
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from 'react';
import styles from "./styles";
import {withStyles} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import useCoreRequest from "../../hooks/useCoreRequest";
import UserData from "../../interfaces/UserData";
import useAuth from "../../hooks/useAuth";
import MonitorLayout from "../MonitorLayout";
import MainPageLayout from "../MainPageLayout";

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

    const {getUser} = useAuth();
    const user = getUser();

    return (
        <React.Fragment>
            {user ? <MonitorLayout/> : <MainPageLayout/>}
        </React.Fragment>
    );
});

export default withStyles(styles)(ChooseLayout);