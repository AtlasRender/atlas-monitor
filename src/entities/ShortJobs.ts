/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */


import BaseEntity from "../core/BaseEntity";
import NumberValidator from "../core/validators/NumberValidator";
import StringValidator from "../core/validators/StringValidator";
import DateValidator from "../core/validators/DateValidator";
import ValidationError from "../core/ValidationError";
import User from "../interfaces/User";
import Organization from "../interfaces/Organization";

export interface ShortJobsValidationMap {
    id?: boolean;
    name?: boolean;
    attemptsPerTaskLimit?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    description?: boolean;
    failed?: boolean;
    frameRange?: boolean;
    doneTasks?: boolean;
    failedTasks?: boolean;
    pendingTasks?: boolean;
    processingTasks?: boolean;
    pluginSettings?: boolean;
    submitter?: boolean;
}


/**
 * ShortJobs - interface for Render ShortJobs
 * @interface
 * @author Andrii Demchyshyn
 */
export default class ShortJobs extends BaseEntity {
    /**
     * id - unique number of job
     */
    public id: number;
    /**public
     * name - name of job
     */
    public name: string;
    /**
     * attemptsPerTaskLimit - limit of render attempts
     */
    public attemptsPerTaskLimit: number;
    /**
     * createdAt - date of creation
     */
    public createdAt: Date;
    /**
     * updatedAt - date of last update
     */
    public updatedAt: Date;
    /**
     * description - information about render job
     */
    public description: string;
    /**
     * failed - status of job complete
     */
    public failed: boolean;
    /**
     * frameRange - frames to render
     */
    public frameRange: any[];

    public organization: Organization
    public doneTasks: number;
    public failedTasks: number;
    public pendingTasks: number;
    public processingTasks: number;
    public pluginSettings: { value1: number, value2: string };
    public submitter: User;


    constructor(job: any) {
        super("ShortJobs");
        const validationMap: ShortJobsValidationMap = {};

        this.id = NumberValidator(job.id).value || 0;
        validationMap.id = NumberValidator(job.id).error;

        this.name = StringValidator(job.name).value || "";
        validationMap.name = StringValidator(job.name).error;

        this.attemptsPerTaskLimit = NumberValidator(job.attempts_per_task_limit).value || 0;
        validationMap.attemptsPerTaskLimit = NumberValidator(job.attempts_per_task_limit).error;

        this.createdAt = DateValidator(job.createdAt).value || new Date();
        validationMap.createdAt = DateValidator(job.createdAt).error;

        this.updatedAt = DateValidator(job.updatedAt).value || new Date();
        validationMap.updatedAt = DateValidator(job.updatedAt).error;

        this.description = StringValidator(job.description).value || "";
        validationMap.description = StringValidator(job.description).error;

        this.failed = !!job.failed;

        this.frameRange = [...job.frameRange];

        this.doneTasks = NumberValidator(job.doneTasks).value || 0;
        validationMap.doneTasks = NumberValidator(job.doneTasks).error;

        this.failedTasks = NumberValidator(job.failedTasks).value || 0;
        validationMap.failedTasks = NumberValidator(job.failedTasks).error;

        this.pendingTasks = NumberValidator(job.pendingTasks).value || 0;
        validationMap.pendingTasks = NumberValidator(job.pendingTasks).error;

        this.processingTasks = NumberValidator(job.processingTasks).value || 0;
        validationMap.processingTasks = NumberValidator(job.processingTasks).error;

        this.organization = job.organization;

        this.pluginSettings = job.pluginSettings;

        this.submitter = job.submitter;

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<ShortJobsValidationMap>("Invalid types", validationMap);
            }
        }
    }
}