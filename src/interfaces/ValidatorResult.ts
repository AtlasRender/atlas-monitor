/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 20:10
 * All rights reserved.
 */

/**
 * ValidatorResult - interface for validators.
 * @interface
 * @author Andrii Demchyshyn
 */
export default interface ValidatorResult<T> {
    /**
     * value - result value.
     */
    value?: T;
    /**
     * error - validation status.
     * if validation failed error = true else error = false.
     */
    error?: boolean;
}
