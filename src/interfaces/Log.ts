/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 03.12.2020, 22:24
 * All rights reserved.
 */

export interface Log {
    /**
     * id - unique number of job
     */
    id: number;
    /**
     * message - text of log
     */
    message: string;
    /**
     * type - message type
     */
    type: string;
    /**
     * createdAt - date of creation
     */
    createdAt: Date;
}