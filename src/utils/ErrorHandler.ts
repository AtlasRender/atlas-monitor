/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 16.12.2020, 20:09
 * All rights reserved.
 */

import KeyPair from "../interfaces/KeyPair";
import RequestError from "../interfaces/RequestError";
import {SnackbarKey} from "notistack";
import useEnqueueErrorSnackbar from "./enqueueErrorSnackbar";

export default class ErrorHandler {
    public handlers: KeyPair<string | (() => void)>;
    public enqueueErrorSnackbar: ((message: string) => SnackbarKey);

    public on(status: number, handler: string | (() => void)): ErrorHandler {
        this.handlers[`${status}`] = handler;
        return this;
    }

    public handle(err: RequestError): void {
        const handler: string | (() => void) = this.handlers[`${err.status}`];
        if(typeof handler === "function") {
            handler();
        } else if(typeof handler === "string") {
            this.enqueueErrorSnackbar(handler);
        } else {
            this.enqueueErrorSnackbar(err.response.body.message)
        }
    }

    constructor(errorSnackbar: any) {
        this.handlers = {};
        this.enqueueErrorSnackbar = errorSnackbar;
    }
}
