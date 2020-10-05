/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 05.10.2020, 11:37
 * All rights reserved.
 */

import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Tabs from "./Tabs";
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

describe("Tabs", () => {
    test("renders with or without a name or another component", () => {
        act(() => {
            render(
                <Tabs/>, container);
        });
        expect(container.textContent).toBe("TASKSINFOSTATISTICS");

        act(() => {
            render(
                <Tabs>
                    some text
                </Tabs>, container);
        });
        expect(container.textContent).toBe("TASKSINFOSTATISTICSsome text");

        act(() => {
            render(
                <Tabs>
                    <TabsPanel value={0} index={0}>
                        some text
                    </TabsPanel>
                </Tabs>, container);
        });
        expect(container.textContent).toBe("TASKSINFOSTATISTICSsome text");
    });
});