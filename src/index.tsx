import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MonitorLayout from "./Layout/MonitorLayout";
import {BrowserRouter} from "react-router-dom";
//import {ChangeRouteProvider} from "routing-manager";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            {/*<ChangeRouteProvider />*/}
            <MonitorLayout  />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
