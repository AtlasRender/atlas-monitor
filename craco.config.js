/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 9/30/20, 3:16 PM
 * All rights reserved.
 */

const rawLoader = require('craco-raw-loader')

module.exports = {
    plugins: [
        {
            plugin: rawLoader,
            options: {test: /\.md$/}
        }
    ]
}