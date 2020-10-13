/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 19:18
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
