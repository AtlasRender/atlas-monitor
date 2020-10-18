/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 18.10.2020, 21:22
 * All rights reserved.
 */

export default interface Role {
    id: number;
    name: string;
    permissionLevel: number;
    description?: string | null;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}