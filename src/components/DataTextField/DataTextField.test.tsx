/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 04.10.2020, 18:14
 * All rights reserved.
 */

import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import DataTextField from "./DataTextField";

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

describe("DataTextField", () => {
    test("renders with or without a name", () => {
        const input = {label: "label", children: "name"};

        const output = "labelname"

        act(() => {
            render(<DataTextField/>, container);
        });
        expect(container.textContent).toBe("");

        act(() => {
            render(<DataTextField label={input.label}>{input.children}</DataTextField>, container);
        });
        expect(container.textContent).toBe(output);

    });
});


