/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: atlas-monitor
 * File last modified: 06.11.2020, 18:39
 * All rights reserved.
 */


import BaseEntity from "../core/BaseEntity";
import NumberValidator from "../core/validators/NumberValidator";
import StringValidator from "../core/validators/StringValidator";
import DateValidator from "../core/validators/DateValidator";
import ValidationError from "../core/ValidationError";
import {UserValidationMap} from "./User";
import {instanceOf} from "prop-types";

export interface ShortJobsValidationMap {
    id?: boolean;
    name?: boolean;
    organizationId?: boolean;
    attemptsPerTaskLimit?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    description?: boolean;
    failed?: boolean;
    frameRange?: boolean;
}


/**
 * ShortJobs - interface for Render ShortJobs
 * @interface
 * @author Andrii Demchyshyn
 */
export default class ShortJobs extends BaseEntity{
    /**
     * id - unique number of job
     */
    public id: number;
    /**public
     * name - name of job
     */
    public name: string;
    /**
     * organizationId - organization unique number
     */
    public organizationId: number;
    /**
     * attemptsPerTaskLimit - limit of render attempts
     */
    public attemptsPerTaskLimit: number;
    /**
     * createdAt - date of creation
     */
   public  createdAt: Date;
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
    public frameRange: string;

    constructor(job: any) {
        super("ShortJobs");
        const validationMap: ShortJobsValidationMap = {};

        this.id = NumberValidator(job.id).value || 0;
        validationMap.id = NumberValidator(job.id).error;

        this.name = StringValidator(job.name).value || "";
        validationMap.name = StringValidator(job.name).error;

        this.organizationId = NumberValidator(job.organizationId).value || 0;
        validationMap.organizationId = NumberValidator(job.organizationId).error;

        this.attemptsPerTaskLimit = NumberValidator(job.attempts_per_task_limit).value || 0;
        validationMap.attemptsPerTaskLimit = NumberValidator(job.attempts_per_task_limit).error;

        this.createdAt = DateValidator(job.createdAt).value || new Date();
        validationMap.createdAt = DateValidator(job.createdAt).error;

        this.updatedAt = DateValidator(job.updatedAt).value || new Date();
        validationMap.updatedAt = DateValidator(job.updatedAt).error;

        this.description = StringValidator(job.description).value || "";
        validationMap.description = StringValidator(job.description).error;

        this.failed = !!job.failed;

        this.frameRange = StringValidator(job.frameRange).value || "";
        validationMap.frameRange = StringValidator(job.frameRange).error;

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<UserValidationMap>("Invalid types", validationMap);
            }
        }
    }
}