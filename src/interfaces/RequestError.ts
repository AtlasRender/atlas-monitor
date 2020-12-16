/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 16.12.2020, 20:28
 * All rights reserved.
 */

import {Response} from "superagent";

export default interface RequestError {
    status: number;
    original: any;
    response: Response;
}
