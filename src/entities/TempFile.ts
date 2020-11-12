/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 11.11.2020, 18:03
 * All rights reserved.
 */

/**
 * TempFile - entity for temporary files.
 * @class
 * @author Danil Andreev
 */
export default class TempFile {
    /**
     * id - id of the file in database.
     */
    public id: number;
    /**
     * name - filename.
     */
    public name: number;
    /**
     * type - file type.
     */
    public type: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        // TODO: add errors handleing
    }
}