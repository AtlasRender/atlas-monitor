/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 13.11.2020, 19:45
 * All rights reserved.
 */

/**
 * Generator for ids
 * @function
 * @generator
 */
export default function* IdGenerator() {
    let id = 0;
    while (true) {
        id++;
        yield id;
    }
    return id;
}
