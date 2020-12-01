/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 20:01
 * All rights reserved.
 */

export default interface Plugin {
    id: number;
    name: string;
    version: string;
    description: string | null;
    note: string | null;
}