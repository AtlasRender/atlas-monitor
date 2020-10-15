/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 23:35
 * All rights reserved.
 */

import User from "./User";

export default interface Organization {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    ownerUser: User;
}