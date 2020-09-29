/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 29.09.2020, 21:44
 * All rights reserved.
 */

import superagent from "superagent";


export const request = (endPoint: string) => {
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

export const coreRequest = (path = null) => {
    return request(path || process.env.REACT_APP_CORE_URL || "");
};