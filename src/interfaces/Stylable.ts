/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {CSSProperties} from "react";

/**
 * Stylable - interface for components, which can be styled.
 * @interface
 * @export default
 * @author Danil Andreev
 */
export default interface Stylable<T = any> {
    /**
     * style - styles of the element.
     */
    style?: CSSProperties;
    /**
     * className - css class of the element.
     */
    className?: string;
    /**
     * classes - classes, applied to the element.
     */
    classes?: T;
}
