/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 04.10.2020, 18:14
 * All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom";
import {render, cleanup} from '@testing-library/react';
import DataTextField from "./DataTextField";

afterEach(cleanup);

describe("DataTextField", () => {
    test("Render without crashing", () => {
        const container = document.createElement("div");
        ReactDOM.render(<DataTextField/>, container);
    });

    test("Render without input", () => {
        const container:any = document.createElement("div");
        render(<DataTextField />, container);
        expect(container.textContent).toBe("");
    });

    test("Render with input", () => {
        const { getByText } = render(<DataTextField label="Name" children="Pathfinder Logo"/>);
        expect(getByText("Name")).not.toBe(null);
        expect(getByText("Pathfinder Logo")).not.toBe(null);
    });
});