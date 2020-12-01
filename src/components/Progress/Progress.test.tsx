/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom";
import {cleanup, render} from "@testing-library/react";
import Progress from "./Progress";
import ListItemProgress from "../ListItemProgress/ListItemProgress";

afterEach(cleanup);

describe("ListItemProgress", () => {
    test("Render without crashing", () => {
        const container = document.createElement("div");
        ReactDOM.render(<Progress/>, container);
    });

    test("Render without input", () => {
        const container: any = document.createElement("div");
        render(<Progress/>, container);
        expect(container.textContent).toBe("");
    });
});
