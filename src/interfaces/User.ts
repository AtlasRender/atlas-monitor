/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 10/7/20, 2:37 PM
 * All rights reserved.
 */

/**
 * User - interface for user data. You can get it from Origin.
 * @interface
 * @author Danil Andreev
 */
export default interface User {
    id: number;
    username: string;
    email?: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    bearer: string;
}
