/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

/**
 * BaseEntity - basic entity class.
 * @class
 * @throws ValidationError
 * @author Danil Adnreev
 */
export default class BaseEntity {
    /**
     * __entityName - system name of this entity.
     */
    __entityName: string;

    /**
     * Creates instance of BaseEntity.
     * @param name - System name of this entity.
     * @author Danil Andreev
     */
    constructor(name: string) {
        this.__entityName = name;
    }
}