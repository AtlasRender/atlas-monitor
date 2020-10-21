/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 16.10.2020, 01:35
 * All rights reserved.
 */

import Organization from "./Organization";
import Role from "./Role";

/**
 * User - interface for user data. You can get it from Origin.
 * @interface
 * @author Danil Andreev
 */
export default interface UserData {
    id: number;
    username: string;
    email?: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    organizations: Organization[];
    roles: Role[];
}
