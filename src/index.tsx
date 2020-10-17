import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {ChangeRouteProvider} from "routing-manager";
import {AuthProvider} from "./hooks/useAuth";
import {SnackbarProvider} from "notistack";
import ChooseLayout from "./layout/ChooseLayout";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <SnackbarProvider maxSnack={3}>
                    <ChooseLayout/>
                </SnackbarProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
