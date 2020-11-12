/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
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
}
