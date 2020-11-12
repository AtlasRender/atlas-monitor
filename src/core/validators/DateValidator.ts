/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import ValidatorResult from "../../interfaces/ValidatorResult";

/**
 * DateValidator - checks for value to ba a Date
 * @function
 * @param value
 * @author Nikita Nesterov
 */

export default function DateValidator(value: any): ValidatorResult<Date> {

    if (!(typeof value === "string" || value instanceof Date)) {
        return {value: undefined, error: true};
    } else if (value instanceof Date) {
        return {value: value, error: false};
    }
    let valueCopy = "" + value;
    if (isNaN(Date.parse(valueCopy))) {
        return {value: undefined, error: true};
    } else {
        return {value: new Date(valueCopy), error: false}
    }
}
