/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 16.10.2020, 00:36
 * All rights reserved.
 */

import BaseEntity from "../core/BaseEntity";
import {UserValidationMap} from "./User";
import NumberValidator from "../core/validators/NumberValidator";
import StringValidator from "../core/validators/StringValidator";
import DateValidator from "../core/validators/DateValidator";
import ValidationError from "../core/ValidationError";

export interface UserTokensValidationMap {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    token?: boolean;
    createdAt?: boolean;
}

export default class UserToken extends BaseEntity {
    // TODO pomenyai
    public id?: number;
    public name?: string;
    public description?: string;
    public token?: string;
    public createdAt?: Date;

    constructor(userToken: any) {
        super("User Token");
        const validationMap: UserTokensValidationMap = {}

        this.id = NumberValidator(userToken.id).value;
        validationMap.id = NumberValidator(userToken.id).error;

        this.name = StringValidator(userToken.name).value;
        validationMap.name = StringValidator(userToken.name).error;

        this.description = StringValidator(userToken.description).value;
        validationMap.description = StringValidator(userToken.description).error;

        this.token = StringValidator(userToken.token).value;
        validationMap.token = StringValidator(userToken.token).error;

        this.createdAt = DateValidator(userToken.createdAt).value;
        validationMap.createdAt = DateValidator(userToken.createdAt).error

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<UserValidationMap>("Invalid types", validationMap);
            }
        }
    }
}