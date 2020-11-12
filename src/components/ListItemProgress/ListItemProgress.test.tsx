/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom";
import {render, cleanup} from '@testing-library/react';
import ListItemProgress from "./ListItemProgress";
import ListItemText from "@material-ui/core/ListItemText";

afterEach(cleanup);

describe("ListItemProgress", () => {
    test("Render without crashing", () => {
        const container = document.createElement("div");
        ReactDOM.render(<ListItemProgress/>, container);
    });

    test("Render without input", () => {
        const container:any = document.createElement("div");
        render(<ListItemProgress />, container);
        expect(container.textContent).toBe("");
    });

    test("Render with input", () => {
        const { getByText } = render(<ListItemProgress>Hello</ListItemProgress>);
        expect(getByText("Hello")).not.toBe(null);
    });

    test("Render with other component", () => {
        const { getByText } = render(<ListItemProgress><ListItemText primary="Hi" secondary="people"/></ListItemProgress>);
        expect(getByText("Hi")).not.toBe(null);
        expect(getByText("people")).not.toBe(null);
    });
});
