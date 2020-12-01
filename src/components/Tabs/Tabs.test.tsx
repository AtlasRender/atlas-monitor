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
import MyTabs from "./Tabs";
import {Box} from "@material-ui/core";
import ListItemProgress from "../ListItemProgress/ListItemProgress";
import TabsPanel from "../TabsPanel/TabsPanel";

afterEach(cleanup);

describe("ListItemProgress", () => {
    test("Render without crashing", () => {
        const container = document.createElement("div");
        ReactDOM.render(<MyTabs value={0}><Box/></MyTabs>, container);
    });

    test("Render without input", () => {
        const container: any = document.createElement("div");
        render(<MyTabs value={0}><TabsPanel value={0} index={0}/></MyTabs>, container);
        expect(container.textContent).toBe("");
    });

    test("Render with input", () => {
        const {getByText} = render(<MyTabs value={0}><TabsPanel value={0} index={0}>Hello</TabsPanel></MyTabs>);
        expect(getByText("Hello")).not.toBe(null);
    });
});
