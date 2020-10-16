/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 20:34
 * All rights reserved.
 */

import ValidatorResult from "../../interfaces/ValidatorResult";

/**
 * StringValidator - checks if value is string or not.
 * @param value
 * @function
 * @author Andrii Demchyshyn
 */
export default function StringValidator(value: any): ValidatorResult<string>{
    let stringValue = value;
    if(typeof stringValue === "number") {
        stringValue = "" + stringValue;
    }
    if(stringValue === null) {
        return {value: stringValue, error: false};
    }
    if(typeof stringValue !== "string") {
        return {value: undefined, error: true};
    }
    return {value: stringValue, error: false};
}