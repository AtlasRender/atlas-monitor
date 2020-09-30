/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 29.09.2020, 21:44
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
    put(route: string):  superagent.SuperAgentRequest;
    /**
     * delete - function, designed to create HTTP request with method DELETE.
     * @author Danil Andreev
     * @function
     */
    delete(route: string):  superagent.SuperAgentRequest;
    /**
     * get - function, designed to create HTTP request with method GET.
     * @author Danil Andreev
     * @function
     */
    get(route: string):  superagent.SuperAgentRequest;
}

/**
 * request - function, designed to send HTTP request to API.
 * @function
 * @author Danil Andreev
 * @example
 * request("thhps://myhost:1234")
 *     .get("hello/darkness/1")
 *     .then(response => {...})
 *     .catch(error => {...});
 */
export const request = (endPoint: string): RequestMethods => {
    const requestLog = (p: string, s: string) => console.log(`request.${p}:`, s);
    return {
        endPoint: () => endPoint,
        post: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog('post', url);
            return superagent.post(url).set('accept', 'application/json').withCredentials();
        },

        put: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog('put', url);
            return superagent.put(url).set('accept', 'application/json').withCredentials();
        },

        delete: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog('delete', url);
            return superagent.delete(url).set('accept', 'application/json').withCredentials();
        },

        get: (route: string): superagent.SuperAgentRequest => {
            const url = `${endPoint}/${route}`;
            requestLog('get', url);
            return superagent.get(url).set('accept', 'application/json').withCredentials();
        }
    }
};

/**
 * coreRequest - function, designed to do requests to Pathfinder Core.
 * @function
 * @author Danil Andreev
 * @example
 * coreRequest()
 *     .get("hello/darkness/1")
 *     .then(response => {...})
 *     .catch(error => {...});
 */
export const coreRequest = (path: string | null = null): RequestMethods => {
    return request(path || process.env.REACT_APP_CORE_URL || "");
};