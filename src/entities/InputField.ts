/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import BasicPluginField from "./BasicPluginField";


/**
 * InputField - interface for Plugin Input Field
 * @interface
 * @author Andrii Demchyshyn
 */
export default class InputField extends BasicPluginField {
    /**
     * niceName - name that will shown
     */
    public niceName: string;
    /**
     * min - min value
     */
    public min: number;
    /**
     * max - max value
     */
    public max: number;
    /**
     * default - default value
     */
    public default: number | string;

    constructor(field: any) {

        super({name: field.name});

        this.niceName = field.niceName;
        this.max = field.max;
        this.min = field.min;
        this.default = field.default;

    }
}