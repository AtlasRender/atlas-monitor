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
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "../../theme";

afterEach(cleanup);

describe("DataTextField", () => {
    test("Render without crashing", () => {
        const container = document.createElement("div");
        ReactDOM.render(<ThemeProvider theme={theme}><DataTextField/></ThemeProvider>, container);
    });

    test("Render without input", () => {
        const container:any = document.createElement("div");
        render(<ThemeProvider theme={theme}><DataTextField/></ThemeProvider>, container);
        expect(container.textContent).toBe("");
    });

    test("Render with input", () => {
        const { getByText } = render(<ThemeProvider theme={theme}><DataTextField label="Name" children="Pathfinder Logo"/></ThemeProvider>);
        expect(getByText("Name")).not.toBe(null);
        expect(getByText("Pathfinder Logo")).not.toBe(null);
    });
});