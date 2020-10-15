/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 20:44
 * All rights reserved.
 */

import ValidatorResult from "../../interfaces/ValidatorResult";

/**
 * DateValidator - checks for value to ba a Date
 * @function
 * @param value
 * @author Nikita Nesterov
 */

export default function DateValidator(value:any): ValidatorResult<Date>{

    if(!(typeof value ==="string" || value instanceof Date)){
        return {value:undefined, error: true};
    }
    else if(value instanceof Date){
        return {value:value, error: false};
    }
    let valueCopy = ""+value;
    try{
        Date.parse(valueCopy)
    }catch (parseException){
        console.log(parseException.name, parseException.message);
        return {value:undefined, error:true};
    }
    return {value: new Date(valueCopy), error: false}
}