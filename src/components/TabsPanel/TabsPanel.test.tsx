/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 05.10.2020, 11:44
 * All rights reserved.
 */

import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import TabsPanel from "../TabsPanel";

let container: any = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("TabsPanel", () => {
    test("renders with or without a name", () => {
        act(() => {
            render(
                <TabsPanel value={0} index={0}/>, container);
        });
        expect(container.textContent).toBe("");

        act(() => {
            render(
                <TabsPanel value={0} index={0}>
                    some text
                </TabsPanel>, container);
        });
        expect(container.textContent).toBe("some text");
    });
});