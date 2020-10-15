/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 21:17
 * All rights reserved.
 */

import DateValidator from "./DateValidator";
import {instanceOf} from "prop-types";

describe("core/validators/DateValidator", ()=>{
    test("Input number",()=>{
        const result = DateValidator(1);
        expect(result.value).toBe(undefined);
        expect(result.error).toBe(true);
    });
    test("Incorrect date string",()=>{
        const result = DateValidator("qweryytyre");
        expect(result.value).toBe(undefined);
        expect(result.error).toBe(true);
    });
    test("Correct date string", ()=>{
        const date = new Date("December 17, 1995 03:24:00")
        const result = DateValidator("December 17, 1995 03:24:00");
        expect(result.value).toMatchObject(date);
        expect(result.error).toBe(false);
    });
    test("Date object", ()=>{
        const date = new Date()
        const result = DateValidator(date);
        expect(result.value).toBe(date);
        expect(result.error).toBe(false);
    })
})
