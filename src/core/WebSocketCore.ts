/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 11/30/20, 2:23 PM
 * All rights reserved.
 */

import qs from "qs";
import WebSocketMessage from "./WebSocketMessage";
import {EventEmitter} from "events";


/**
 * WebSocketCore - class for handling web socket connection to Atlas Core.
 * @class
 * @author Danil Andreev
 */
export default class WebSocketCore extends WebSocket {
    /**
     * eventDispatcher - event dispatcher for web socket got events.
     */
    public static eventDispatcher: EventEmitter = new EventEmitter();

    /**
     * Creates an instance of WebSocketCore.
     * @constructor
     * @param getToken - Callback for getting current token.
     * @author Danil Andreev
     */
    constructor(getToken?: () => string) {
        if (!process.env.REACT_APP_CORE_WEBSOCKET_URL)
            throw new ReferenceError(`ENV "REACT_APP_CORE_WEBSOCKET_URL" is not defined.`);

        let url = process.env.REACT_APP_CORE_WEBSOCKET_URL;
        if (getToken)
            url += "?" + qs.stringify({bearer: getToken()});

        super(url);

        this.onopen = (event: Event) => {
            console.log("Connected to web socket");
        }

        this.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                console.log("Disconnected from web socket.");
            }
            else {
                console.error("Web socket connection terminated.", event.code, "Reason: ", event.reason);
            }
        }

        this.onerror = (error: Event) => {
            console.error("Web socket error:", event);
        }

        this.onmessage = (event: MessageEvent) => {
            try {
                const message: WebSocketMessage = new WebSocketMessage(event.data);
                console.log("Dispatching event ", message.type);
                WebSocketCore.eventDispatcher.emit(message.type, message.payload);
            } catch (error) {
                if (error instanceof TypeError)
                    console.error("Incorrect message got through websocket connection.", event.data);
                else
                    console.error(error);
            }
        }

    }
}
