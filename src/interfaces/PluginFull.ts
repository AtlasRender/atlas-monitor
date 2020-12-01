/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 01.12.2020, 00:15
 * All rights reserved.
 */

import {PluginSettingsSpec} from "@atlasrender/render-plugin";

export default interface PluginFull {
    id: number;
    name: string;
    version: string;
    description: string | null;
    note: string | null;
    readme: string | null;
    rules: PluginSettingsSpec;
}