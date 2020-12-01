/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 16:30
 * All rights reserved.
 */

import BasicPluginField from "./BasicPluginField";


/**
 * BooleanPluginField - interface for Boolean Plugin Field
 * @interface
 * @author Andrii Demchyshyn
 */
export default class BooleanField extends BasicPluginField {
    /**
     * default - default value
     */
    public default?: boolean

    constructor(field: any) {
        super({id: field.id, type: field.type, name: field.name, label: field.label});

        this.default = field.default;
    }
}