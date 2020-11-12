/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {ReactNode} from "react";

/**
 * Containerable - interface for components, which has children.
 * @interface
 * @export default
 * @author Danil Andreev
 */
export default interface Containerable<T = ReactNode> {
    /**
     * Children of element.
     */
    children?: T;
}
