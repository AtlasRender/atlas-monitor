/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 02.10.2020, 19:20
 * All rights reserved.
 */

/**
 * Stylable - interface for components, which can be styled.
 * @interface
 * @export default
 * @author Danil Andreev
 */
export default interface Stylable {
    /**
     * style - styles of the element.
     * @type object
     */
    style?: any;
    /**
     * className - css class of the element.
     * @type string
     */
    className?: string;
    /**
     * classes - classes, applied to the element.
     * @type object
     */
    classes?: any;
}
