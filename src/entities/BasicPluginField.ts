/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
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