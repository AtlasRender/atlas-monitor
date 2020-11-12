/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 11.11.2020, 19:53
 * All rights reserved.
 */

import BaseEntity from "../core/BaseEntity";

/**
 * BasicPluginField - interface for Basic Plugin Field
 * @interface
 * @author Andrii Demchyshyn
 */
export default class BasicPluginField extends BaseEntity {
    /**
     * name - name of plugin field
     */
    public name: string;

    constructor(field: any) {
        super("Basic Plugin Field");

        this.name = field.name;
    }
}