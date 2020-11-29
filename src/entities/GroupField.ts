/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 16:39
 * All rights reserved.
 */

import BasicPluginField from "./BasicPluginField";


/**
 * GroupField - interface for Folder Plugin Field
 * @interface
 * @author Andrii Demchyshyn
 */
export default class GroupField extends BasicPluginField {
    /**
     * nested - array inside of folder
     */
    public nested: BasicPluginField[];

    constructor(field: any) {
        super({id: field.id, type: field.type, name: field.name, label: field.label});

        this.nested = field.nested;
    }
}