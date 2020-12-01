/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 30.11.2020, 21:34
 * All rights reserved.
 */

export default interface PluginPreview {
    id: number;
    name: string;
    version: string;
    description: string | null;
    note: string | null;
    readme: string | null;
}