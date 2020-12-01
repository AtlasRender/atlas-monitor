/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./hooks/useAuth";
import {SnackbarProvider} from "notistack";
import ChooseLayout from "./layout/ChooseLayout";
import {ConfirmProvider} from "./hooks/useConfirm";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <ConfirmProvider>
                    <BrowserRouter>
                        <SnackbarProvider maxSnack={3}>
                            <ChooseLayout/>
                        </SnackbarProvider>
                    </BrowserRouter>
                </ConfirmProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
