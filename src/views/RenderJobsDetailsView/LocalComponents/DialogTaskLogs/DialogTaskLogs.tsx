/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 02.12.2020, 20:47
 * All rights reserved.
 */

import React, {Ref, useEffect, useState} from "react";
import {Button, Dialog, DialogTitle, List, ListItem, ListItemText, Paper, withStyles,} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../../../interfaces/Stylable";

interface DialogTaskLogsProps extends Stylable {
    open: boolean;

    onClose(): void;

}


const DialogTaskLogs = React.forwardRef((props: DialogTaskLogsProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        onClose,
    } = props;


    const [logs, setLogs] = useState([{log: "haha\nhihi\nhehe", color: "warning"}, {
        log: "haha\nhihi\nhehe",
        color: "yellow"
    }, {log: "haha\nhihi\nhehe", color: "red"}, {log: "haha\nhihi\nhehe", color: "error"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "report"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"},{log: "haha\nhihi\nhehe", color: "white"}, {log: "haha\nhihi\nhehe", color: "white"}, {
        log: "haha\nhihi\nhehe",
        color: "white"
    }, {log: "haha\nhihi\nhehe", color: "white"}]);

    // function getNewLog() {
    //     setLogs((prev) => [...prev, {log: "haha\nhihi\nhehe", color: "white"}])
    // }
    //
    // useEffect(() => {
    //     setTimeout(getNewLog,3000);
    // })

    const refDiv = React.useRef<HTMLDivElement | null>(null);
    const refList = React.useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        window.addEventListener("scroll", handleChangeScroll);
        return () => window.removeEventListener("scroll", handleChangeScroll);
    }, []);

    function handleChangeScroll() {

    }

    let Visible = function (target: any, container: any) {

        console.log(target.offsetTop - (container.scrollTop + container.offsetHeight));

        console.log(refList);


        console.log(window.pageYOffset, target.getBoundingClientRect().bottom);

        let targetPosition = {
                top: window.pageYOffset + target.getBoundingClientRect().top,
                bottom: window.pageYOffset + target.getBoundingClientRect().bottom
            },
            windowPosition = {
                top: window.pageYOffset,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        // console.log(targetPosition.top - 63, windowPosition.bottom);


        //
        // console.log(target.offsetTop, (container.scrollTop + container.offsetHeight))


        if(target.offsetTop - (container.scrollTop + container.offsetHeight) < 0) {
            return true;
        }

        return targetPosition.top - 63 < windowPosition.bottom;
    };





    //TODO make normal scrolling when you in the bottom of the screen
    useEffect(() => {
        if (refDiv.current && Visible(refDiv.current, refList.current)) {
            refDiv.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);



    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullWidth
        >
            <DialogTitle className={classes.dialogTitle}>
                Task Logs
            </DialogTitle>


            <List className={classes.dialogContainer} ref={refList}>
                {logs.map((log, key) => {
                    const logStrings = log.log.split("\n");
                    let color = "white";
                    switch (log.color) {
                        case "report":
                            color = "white";
                            break;
                        case "warning":
                            color = "yellow";
                            break;
                        case "error":
                            color = "red";
                            break;
                    }
                    return logStrings.map((string, key) => {
                        return (
                            <React.Fragment>
                                <ListItem className={classes.row}>
                                    <ListItemText className={classes.rowText} style={{color: color}}>
                                        {string}
                                    </ListItemText>
                                </ListItem>
                            </React.Fragment>
                        );
                    });
                })}
                <div style={{height: 1}} id="target" ref={refDiv}/>
            </List>

            <Button onClick={() => setLogs((prev) => [...prev, {log: "haha\nhihi\nhehe", color: "white"}])}>
                Click
            </Button>

        </Dialog>
    );
});

export default withStyles(styles)(DialogTaskLogs);