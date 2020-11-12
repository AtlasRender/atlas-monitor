/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
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
