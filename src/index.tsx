import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MonitorLayout from "./layout/MonitorLayout";
import {BrowserRouter} from "react-router-dom";
import {ChangeRouteProvider} from "routing-manager";
import {AuthProvider} from "./hooks/useAuth";
import {SnackbarProvider} from "notistack";
import MainPageLayout from "./layout/MainPageLayout";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <ChangeRouteProvider routeMask="/pages/:page(/:panel)">
                    <SnackbarProvider maxSnack={3} >
                        <MainPageLayout/>
                        {/*<MonitorLayout/>*/}
                    </SnackbarProvider>
                </ChangeRouteProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
