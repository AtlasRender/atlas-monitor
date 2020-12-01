/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 11/30/20, 3:25 PM
 * All rights reserved.
 */

export default class WebSocketMessage<T = any> {
    type: string;
    payload: T;

    constructor(input: any) {
        if (typeof input !== "object")
            throw new TypeError(`Incorrect type of input, expected "object", got "${typeof input}"`);

        if (typeof input.type !== "string")
            throw new TypeError(`Incorrect type of "type" field, expected "string", got "${typeof input.type}"`);
        this.type = input.type;

        this.payload = input.payload;
    }
}
