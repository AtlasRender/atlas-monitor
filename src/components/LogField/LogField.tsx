/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 23:28
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import {List, ListItem} from "@material-ui/core";
import Stylable from "../../interfaces/Stylable";
import Typography from "@material-ui/core/Typography";
import request from "superagent";

/**
 * LogFieldProps - interface for LogField component
 * @interface
 * @author Andrii Demchyshyn
 */
interface LogFieldProps extends Stylable {
    handleGetLogs(): any;
}

/**
 * LogField - creates field that displays logs
 * @function
 * @author Andrii Demchyshyn
 */
const LogField = React.forwardRef((props: LogFieldProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        handleGetLogs
    } = props;

    const [logs, setLogs] = useState([{message: "haha", type: "info"}]);


    const refDiv = React.useRef<HTMLDivElement | null>(null);
    const refList = React.useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        //TODO change response to response.body
        handleGetLogs().then((response: any) => {
            console.log(response);
            setLogs(response);
        })
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleChangeScroll);
        return () => window.removeEventListener("scroll", handleChangeScroll);
    }, []);

    //TODO make normal scrolling when you in the bottom of the screen
    useEffect(() => {
        if (refDiv.current && Visible(refDiv.current, refList.current)) {
            refDiv.current.scrollIntoView({behavior: "smooth"});
        }
    }, [logs]);


    function handleChangeScroll() {

    }

    let Visible = function (target: any, container: any) {

        // console.log(target.offsetTop - (container.scrollTop + container.offsetHeight));
        // console.log(refList);
        // console.log(window.pageYOffset, target.getBoundingClientRect().bottom);

        let targetPosition = {
                top: window.pageYOffset + target.getBoundingClientRect().top,
                bottom: window.pageYOffset + target.getBoundingClientRect().bottom
            },
            windowPosition = {
                top: window.pageYOffset,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        // console.log(targetPosition.top - 12, windowPosition.bottom);
        // console.log(target.offsetTop, (container.scrollTop + container.offsetHeight))

        if (target.offsetTop - (container.scrollTop + container.offsetHeight) < 0) {
            return true;
        }

        return targetPosition.top - 12 < windowPosition.bottom;
    };


    return (
        <List className={classes.dialogContainer} ref={refList}>
            {logs.map((log, key) => {
                const logStrings = log.message.split("\n");
                let color = "white";
                switch (log.type) {
                    case "info":
                        color = "white";
                        break;
                    case "warning":
                        color = "yellow";
                        break;
                    case "error":
                        color = "red";
                        break;
                }
                return logStrings.map((string: string, key: number) => {
                    return (
                        <React.Fragment>
                            <ListItem className={classes.row}>
                                <Typography className={classes.rowText} style={{color: color}}>
                                    {string}
                                </Typography>
                            </ListItem>
                        </React.Fragment>
                    );
                });
            })}
            <div style={{height: 1}} id="target" ref={refDiv}/>
        </List>
    );
});

export default withStyles(styles)(LogField);