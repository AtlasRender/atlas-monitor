/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 06.10.2020, 21:07
 * All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom";
import {render, cleanup} from '@testing-library/react';
import SimpleList from "./SimpleList";

afterEach(cleanup);

//TODO make normal test (routing-manager compile error)
describe("ListItemProgress", () => {
    test("empty test", () => {
       expect(1).toBe(1);
    });
});