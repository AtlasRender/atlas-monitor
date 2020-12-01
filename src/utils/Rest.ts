/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 13:36
 * All rights reserved.
 */

import superagent from "superagent";

/**
 * RequestMethods - methods, which returns request function
 * - ___post___ - POST
 * - ___get___ - GET
 * - ___delete___ - DELETE
 * - ___put___ - PUT
 * @interface
 * @export RequestMethods
 * @author Danil Andreev
 */
export interface RequestMethods {
    /**
     * endPoint - function, designed to get current selected endPoint of request.
     * @author Danil Andreev
     * @function
     */
    endPoint(): string;

    /**
     * post - function, designed to create HTTP request with method POST.
     * @author Danil Andreev
     * @function
     */
    post(route: string): superagent.SuperAgentRequest;

    /**
     * put - function, designed to create HTTP request with method PUT.
     * @author Danil Andreev
     * @function
     */
    put(route: string): superagent.SuperAgentRequest;

    /**
     * delete - function, designed to create HTTP request with method DELETE.
     * @author Danil Andreev
     * @function
     */
    delete(route: string): superagent.SuperAgentRequest;

    /**
     * get - function, designed to create HTTP request with method GET.
     * @author Danil Andreev
     * @function
     */
    get(route: string): superagent.SuperAgentRequest;
}

/**
 * RequestMiddleware - type for superagent request middleware.
 * @export RequestMiddleware
 * @author Danil Andreev
 */
export declare type RequestMiddleware = (request: superagent.SuperAgentRequest) => superagent.SuperAgentRequest;

/**
 * request - function, designed to send HTTP request to API.
 * @function
 * @param endPoint - Path to Origin.
 * @param middleware - Superagent request middleware.
 * @author Danil Andreev
 * @export request
 * @example
 * request("thhps://myhost:1234")
 *     .get("hello/darkness/1")
 *     .then(response => {...})
 *     .catch(error => {...});
 */
export const request = (endPoint: string, middleware?: RequestMiddleware): RequestMethods => {
    /**
     * defaultMiddleware - request middleware by default.
     * @function
     * @param request - Superagent request
     * @author Danil Andreev
     */
    function defaultMiddleware(request: superagent.SuperAgentRequest): superagent.SuperAgentRequest {
        return request.accept("application/json");
    }

    const requestMiddleware = middleware || defaultMiddleware;
    const requestLog = (p: string, s: string) => console.log(`request.${p}:`, s);
    return {
        endPoint: () => endPoint,
        post: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog("post", url);
            return requestMiddleware(superagent.post(url));
        },

        put: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog("put", url);
            return requestMiddleware(superagent.put(url));
        },

        delete: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog("delete", url);
            return requestMiddleware(superagent.delete(url));
        },

        get: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog("get", url);
            return requestMiddleware(superagent.get(url));
        }
    };
};

/**
 * coreRequest - function, designed to do requests to Pathfinder Core.
 * @function
 * @param path - Path to Origin. By default got from ENV REACT_APP_CORE_URL
 * @param middleware - Superagent request middleware.
 * @author Danil Andreev
 * @export coreRequest
 * @example
 * coreRequest()
 *     .get("hello/darkness/1")
 *     .then(response => {...})
 *     .catch(error => {...});
 */
export const coreRequest = (path?: string, middleware?: RequestMiddleware): RequestMethods => {
    return request(path || process.env.REACT_APP_CORE_URL || "", middleware);
};
