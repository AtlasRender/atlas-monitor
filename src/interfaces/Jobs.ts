/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 10.11.2020, 19:22
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