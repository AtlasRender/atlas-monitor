/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

/**
 * BasicPluginField - interface for Basic Plugin Field
 * @interface
 * @author Andrii Demchyshyn
 */
export default class BasicPluginField {
    /**
     * id - unique value
     */
    public id: number;
    /**
     * type - field type
     */
    public type: string;
    /**
     * name - name of plugin field
     */
    public name: string;
    /**
     * label - visual name
     */
    public label: string;


    constructor(field: any) {
        this.id = field.id;
        this.type = field.type;
        this.name = field.name;
        this.label = field.label;
    }
}