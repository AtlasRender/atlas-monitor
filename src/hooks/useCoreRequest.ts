/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 10/7/20, 4:03 PM
 * All rights reserved.
 */

import React from "react";
import useAuth from "./useAuth";
import {coreRequest, RequestMethods, RequestMiddleware} from "../utils/Rest";
import {SuperAgentRequest} from "superagent";

/**
 * CoreRequestHooked - type for core request, got from useCoreRequest() hook.
 * @export CoreRequestHooked
 * @author Danil Andreev
 */
export declare type CoreRequestHooked = (path?: string) => RequestMethods;

/**
 * useCoreRequest - React hook for easy connecting to Origin using Restful technology.
 * @function
 * @param defaultPath - Default Origin path for request, will be applied to coreRequest().
 * @author Danil Andreev
 * @export default
 * @example
 */
export default function useCoreRequest(defaultPath?: string): CoreRequestHooked {
    const {getUser, isLogged} = useAuth();
    const user = getUser();

    const middleware: RequestMiddleware = (request: SuperAgentRequest): SuperAgentRequest => {
        request.set('accept', 'application/json');
        request.set('Content-Type', 'application/json');
        if (isLogged && user && user.bearer) request.set("Authorization", "Bearer " + user.bearer);
        return request;
    }
    return (path: string | undefined = defaultPath): RequestMethods => coreRequest(path, middleware);
}
