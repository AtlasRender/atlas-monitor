/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:27
 * All rights reserved.
 */

import ShortJobs from "./ShortJobs";

export interface RenderJobValidationMap {}


export default class RenderJob extends ShortJobs{
    constructor(job: any, shortJob: any) {
        super(shortJob);
    }
}