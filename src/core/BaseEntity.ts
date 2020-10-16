/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 19:35
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