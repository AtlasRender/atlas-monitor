/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 14:01
 * All rights reserved.
 */

import BaseEntity from "../core/BaseEntity";
import {UserValidationMap} from "./User";
import NumberValidator from "../core/validators/NumberValidator";
import StringValidator from "../core/validators/StringValidator";
import DateValidator from "../core/validators/DateValidator";
import ValidationError from "../core/ValidationError";

/**
 * UserTokensValidationMap - interface for User tokens input fields validation.
 * @interface
 * @author Andrii Demchyshyn
 */
export interface UserTokensValidationMap {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    token?: boolean;
    createdAt?: boolean;
}

/**
 * UserToken - creates and validates user token entity.
 * @class
 * @author Andrii Demchyshyn
 */
export default class UserToken extends BaseEntity {
    /**
     * id - unique value of the token
     */
    public id: number;
    /**
     * name - name of the token
     */
    public name: string;
    /**
     * description - description of the token
     */
    public description: string;
    /**
     * token - special unique value which is created after token creation
     */
    public token?: string;
    /**
     * createdAt - date of the token creation
     */
    public createdAt: Date;

    /**
     * constructor - creates and validates user token entity.
     * @param userToken
     * @constructor
     * @throws ValidationError
     * @author Andrii Demchyshyn
     */
    constructor(userToken: any) {
        super("User Token");
        const validationMap: UserTokensValidationMap = {}

        this.id = NumberValidator(userToken.id).value || 0;
        validationMap.id = NumberValidator(userToken.id).error;

        this.name = StringValidator(userToken.name).value || "";
        validationMap.name = StringValidator(userToken.name).error;

        this.description = StringValidator(userToken.description).value || "";
        validationMap.description = StringValidator(userToken.description).error;

        this.token = StringValidator(userToken.token).value;
        validationMap.token = StringValidator(userToken.token).error;

        this.createdAt = DateValidator(userToken.createdAt).value || new Date();
        validationMap.createdAt = DateValidator(userToken.createdAt).error

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<UserTokensValidationMap>("Invalid types", validationMap);
            }
        }
    }
}
