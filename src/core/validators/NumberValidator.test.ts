/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import NumberValidator from "./NumberValidator";

describe("core/validators/NumberValidator", () => {
    test("Input number test", () => {
        const result = NumberValidator(10);
        expect(result.value).toBe(10);
        expect(result.error).toBe(false);
    });

    test("Input string number test", () => {
        const result = NumberValidator("10");
        expect(result.value).toBe(10);
        expect(result.error).toBe(false);
    });

    test("Input string text test", () => {
        const result = NumberValidator("Hello");
        expect(result.value).toBe(undefined);
        expect(result.error).toBe(true);
    });

    test("Input object test", () => {
        const result = NumberValidator({text: "Hello"});
        expect(result.value).toBe(undefined);
        expect(result.error).toBe(true);
    });

    test("Input boolean test", () => {
        const result = NumberValidator(true);
        expect(result.value).toBe(undefined);
        expect(result.error).toBe(true);
    });
});