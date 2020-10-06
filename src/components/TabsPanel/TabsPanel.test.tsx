/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 05.10.2020, 11:44
 * All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom";
import {render, cleanup} from '@testing-library/react';
import TabsPanel from "../TabsPanel/TabsPanel";

afterEach(cleanup);

describe("ListItemProgress", () => {
    test("Render without crashing", () => {
        const container = document.createElement("div");
        ReactDOM.render(<TabsPanel value={0} index={0}/>, container);
    });

    test("Render without input", () => {
        const container:any = document.createElement("div");
        render(<TabsPanel value={0} index={0}/>, container);
        expect(container.textContent).toBe("");
    });

    test("Render with input", () => {
        const { getByText } = render(<TabsPanel value={0} index={0}>Hello</TabsPanel>);
        expect(getByText("Hello")).not.toBe(null);
    });
});