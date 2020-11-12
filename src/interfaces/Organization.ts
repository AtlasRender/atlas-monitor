/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import UserData from "./UserData";

export default interface Organization {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    //TODO into another interface
    ownerUser: UserData;
    users: UserData[];
}