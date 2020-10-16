/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 20:07
 * All rights reserved.
 */

import ValidatorResult from "../../interfaces/ValidatorResult";

/**
 * NumberValidator - checks if value is number or not.
 * @param value
 * @function
 * @author Andrii Demchyshyn
 */
export default function NumberValidator(value: any): ValidatorResult<number>{
    if(isNaN(+value) || typeof value === "boolean") {
        return {value: undefined, error: true};
    }
    return {value: +value, error: false};
}