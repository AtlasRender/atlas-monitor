import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MonitorLayout from "./layout/MonitorLayout";
import {BrowserRouter} from "react-router-dom";
import {ChangeRouteProvider} from "routing-manager";
import {AuthProvider} from "./hooks/useAuth";
import {SnackbarProvider} from "notistack";
import {ConfirmProvider} from "./hooks/useConfirm";

ReactDOM.render(
    <React.StrictMode>
        <ConfirmProvider>
            <AuthProvider>
                <BrowserRouter>
                    <ChangeRouteProvider routeMask="/pages/:page(/:panel)">
                        <SnackbarProvider maxSnack={3} >
                            <MonitorLayout/>
                        </SnackbarProvider>
                    </ChangeRouteProvider>
                </BrowserRouter>
            </AuthProvider>
        </ConfirmProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
