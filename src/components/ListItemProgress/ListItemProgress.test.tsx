/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 04.10.2020, 19:18
 * All rights reserved.
 */

import React, {createRef} from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import ListItemProgress from "./ListItemProgress";
import ListItemText from "@material-ui/core/ListItemText";

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

describe("ListItemProgress", () => {
    test("it should return smth", () => {
        const input = {progress: 20, name: "name", submitter: "submitter"};
        const output = "namesubmitter";
        act(() => {
            render(
                <ListItemProgress
                    progress={input.progress}
                    style={{background: "black"}}
                >
                    <ListItemText primary={input.name} secondary={input.submitter}/>
                </ListItemProgress>, container);
        });
        expect(container.textContent).toBe(output);
    });
});
