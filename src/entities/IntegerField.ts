/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 16:36
 * All rights reserved.
 */

import BasicPluginField from "./BasicPluginField";


/**
 * IntegerField - interface for Integer Plugin Field
 * @interface
 * @author Andrii Demchyshyn
 */
export default class IntegerField extends BasicPluginField {
    /**
     * default - default value
     */
    public default?: number;
    /**
     * min - min value
     */
    public min?: number;
    /**
     * max - max value
     */
    public max?: number;

    constructor(field: any) {
        super({id: field.id, type: field.type, name: field.name, label: field.label});

        this.default = field.default;
        this.min = field.min;
        this.max = field.max;
    }
}