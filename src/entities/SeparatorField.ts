/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 16:41
 * All rights reserved.
 */

import BasicPluginField from "./BasicPluginField";


/**
 * SeparatorPluginField - interface for Divider Plugin Field
 * @interface
 * @author Andrii Demchyshyn
 */
export default class SeparatorField extends BasicPluginField {

    constructor(field: any) {
        super({id: field.id, type: field.type, name: field.name, label: field.label});
    }

}