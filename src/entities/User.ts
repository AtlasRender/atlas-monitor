/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 19:32
 * All rights reserved.
 */

import BaseEntity from "../core/BaseEntity";
import NumberValidator from "../core/validators/NumberValidator";
import StringValidator from "../core/validators/StringValidator";
import DateValidator from "../core/validators/DateValidator";
import ValidationError from "../core/ValidationError";

export interface UserValidationMap {
    id?: boolean;
    username?: boolean;
    email?: boolean;
    deleted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bearer?: boolean;
}

export default class User extends BaseEntity {
    public id?: number;
    public username?: string;
    public email?: string;
    public deleted?: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
    public bearer?: string;

    constructor(user: any) {
        super("User");
        const validationMap: UserValidationMap = {}

        this.id = NumberValidator(user.id).value;
        validationMap.id = NumberValidator(user.id).error;

        this.username = StringValidator(user.username).value;
        validationMap.username = StringValidator(user.username).error;

        this.email = StringValidator(user.email).value;
        validationMap.email = StringValidator(user.email).error;

        this.deleted = !!user.deleted;

        this.createdAt = DateValidator(user.createdAt).value;
        validationMap.createdAt = DateValidator(user.createdAt).error;

        this.updatedAt = DateValidator(user.updatedAt).value;
        validationMap.updatedAt = DateValidator(user.updatedAt).error;

        this.bearer = StringValidator(user.bearer).value;
        validationMap.bearer = StringValidator(user.bearer).error;

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<UserValidationMap>("Invalid types", validationMap);
            }
        }
    }
}
