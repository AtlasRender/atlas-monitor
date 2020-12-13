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

export interface TaskValidationMap {
    id?: boolean;
    frame?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    progress?: boolean;
}


/**
 * ShortJobs - interface for Render ShortJobs
 * @interface
 * @author Andrii Demchyshyn
 */
export default class Task extends BaseEntity {
    /**
     * id - unique number of job
     */
    public id: number;
    /**
     * frame - frame of task
     */
    public frame: number;
    /**
     * status - status of task
     */
    public status: string;
    /**
     * createdAt - date of creation
     */
    public createdAt: Date;
    /**
     * updatedAt - date of last update
     */
    public updatedAt: Date;
    /**
     * progress - task processing progress
     */
    public progress: number;

    constructor(task: any) {
        super("ShortJobs");
        const validationMap: TaskValidationMap = {};

        this.id = NumberValidator(task.id).value || 0;
        validationMap.id = NumberValidator(task.id).error;

        this.frame = NumberValidator(task.frame).value || 0;
        validationMap.frame = NumberValidator(task.frame).error;

        this.status = StringValidator(task.status).value || "";
        validationMap.status = StringValidator(task.status).error;

        this.createdAt = DateValidator(task.createdAt).value || new Date();
        validationMap.createdAt = DateValidator(task.createdAt).error;

        this.updatedAt = DateValidator(task.updatedAt).value || new Date();
        validationMap.updatedAt = DateValidator(task.updatedAt).error;

        this.progress = NumberValidator(task.progress).value || 0;
        validationMap.progress = NumberValidator(task.progress).error;

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<TaskValidationMap>("Invalid types", validationMap);
            }
        }
    }
}