/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
 * All rights reserved.
 */

import ShortJobs from "./ShortJobs";

export interface RenderJobValidationMap {
}


export default class RenderJob extends ShortJobs {
    constructor(job: any, shortJob: any) {
        super(shortJob);
    }
}