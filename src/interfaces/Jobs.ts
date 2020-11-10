/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 06.11.2020, 18:07
 * All rights reserved.
 */

/**
 * ShortJobs - interface for Render ShortJobs
 * @interface
 * @author Andrii Demchyshyn
 */
export interface Jobs {
    /**
     * id - unique number of job
     */
    id: number;
    /**
     * name - name of job
     */
    name: string;
    /**
     * organizationId - organization unique number
     */
    organizationId: number;
    /**
     * attemptsPerTaskLimit - limit of render attempts
     */
    attemptsPerTaskLimit: number;
    /**
     * createdAt - date of creation
     */
    createdAt: Date;
    /**
     * updatedAt - date of last update
     */
    updatedAt: Date;
    /**
     * description - information about render job
     */
    description: string;
    /**
     * failed - status of job complete
     */
    failed: boolean;
    /**
     * frameRange - frames to render
     */
    frameRange: string;
    /**
     * pluginsId - unique number of plugin
     */
    pluginsId: number | null;
}