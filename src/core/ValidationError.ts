/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 19:33
 * All rights reserved.
 */

/**
 * ValidationError - validation error.
 * @class
 * @author Danil Andreev
 */
export default class ValidationError<T = any> extends Error {
    /**
     * validation - validation map of an error.
     */
    public readonly validation: T;
    /**
     * Creates ValidationError instance.
     * @constructor
     * @param message - Message for Error.
     * @param validation - Validation map of an error.
     * @author Danil Andreev
     */
    constructor(message: string, validation: T) {
        super(message);
        this.validation = validation;
    }
}
