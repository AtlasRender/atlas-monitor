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
 * CoreEventDispatcher - class for handling web socket connection to Atlas Core.
 * @class
 * @author Danil Andreev
 */
export default class CoreEventDispatcher extends EventEmitter {
    /**
     * instance - current instance of the dispatchcer.
     */
    protected static instance: CoreEventDispatcher = new CoreEventDispatcher();

    /**
     * ws - web socket connection object.
     */
    protected static ws: WebSocket | null = null;

    /**
     * Creates an instance of CoreEventDispatcher.
     * @constructor
     * @author Danil Andreev
     */
    protected constructor() {
        super();
    }

    /**
     * getInstance - returns current instance of the CoreEventDispatcher.
     * @method
     * @author Danil Andreev
     */
    public static getInstance(): CoreEventDispatcher {
        if (!CoreEventDispatcher.instance) CoreEventDispatcher.instance = new CoreEventDispatcher();
        return CoreEventDispatcher.instance;
    }

    /**
     * connect - creates a new web socket connection.
     * If it was an existing connection - it will be closed woth code 200 and replaces.
     * @method
     * @throws ReferenceError
     * @param token
     * @author Danil Andreev
     */
    public static connect(token: string): void {
        CoreEventDispatcher.disconnect();

        if (!process.env.REACT_APP_CORE_WEBSOCKET_URL)
            throw new ReferenceError(`ENV "REACT_APP_CORE_WEBSOCKET_URL" is not defined.`);

        // Add bearer to query string of the request.
        let url = process.env.REACT_APP_CORE_WEBSOCKET_URL;
        if (token)
            url += "?" + qs.stringify({bearer: token});

        CoreEventDispatcher.ws = new WebSocket(url);

        CoreEventDispatcher.ws.onopen = (event: Event) => {
            console.log("Connected to web socket");
        }

        CoreEventDispatcher.ws.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                console.log("Disconnected from web socket.");
            }
            else {
                console.error("Web socket connection terminated.", event.code, "Reason: ", event.reason);
            }
        }

        CoreEventDispatcher.ws.onerror = (error: Event) => {
            console.error("Web socket error:", error);
        }

        CoreEventDispatcher.ws.onmessage = (event: MessageEvent) => {
            try {
                const message: WebSocketMessage = new WebSocketMessage(JSON.parse(event.data));
                console.log("Dispatching event ", message.type);
                CoreEventDispatcher.instance.emit(message.type, message.payload);
            } catch (error) {
                if (error instanceof TypeError)
                    console.error("Incorrect message got through websocket connection.", error.message, event.data);
                else if (error instanceof SyntaxError)
                    console.error("Incorrect message got through websocket connection. Expected object, got: ", event.data);
                else
                    console.error(error);
            }
        }
    }

    /**
     * disconnect - method, designed to disconnect web socket from remote host.
     * @method
     * @author Danil Andreev
     */
    public static disconnect(): void {
        if (CoreEventDispatcher.ws) CoreEventDispatcher.ws.close(1000, "Session end");
        CoreEventDispatcher.ws = null;
    }
}
