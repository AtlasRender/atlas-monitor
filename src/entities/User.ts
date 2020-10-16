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

/**
 * UserValidationMap - interface for User input fields validation.
 * @interface
 * @author Andrii Demchyshyn
 */
export interface UserValidationMap {
    id?: boolean;
    username?: boolean;
    email?: boolean;
    deleted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bearer?: boolean;
}

/**
 * User - creates and validates user entity.
 * @class
 * @author Andrii Demchyshyn
 */
export default class User extends BaseEntity {
    /**
     * id - unique value of the user
     */
    public id: number;
    /**
     * username - username of the user
     */
    public username: string;
    /**
     * email - email of the user
     */
    public email: string;
    /**
     * deleted - is user deleted
     */
    public deleted: boolean;
    /**
     * createdAt - date of the user creation
     */
    public createdAt: Date;
    /**
     * updatedAt - date when user was updated
     */
    public updatedAt: Date;
    /**
     * bearer bearer of user
     */
    public bearer: string;

    /**
     * constructor - creates an instance of the user entity.
     * @param user
     * @constructor
     * @throws ValidationError
     * @author Andrii Demchyshyn
     */
    constructor(user: any) {
        super("User");
        const validationMap: UserValidationMap = {}

        this.id = NumberValidator(user.id).value || 0;
        validationMap.id = NumberValidator(user.id).error;

        this.username = StringValidator(user.username).value || "";
        validationMap.username = StringValidator(user.username).error;

        this.email = StringValidator(user.email).value || "";
        validationMap.email = StringValidator(user.email).error;

        this.deleted = !!user.deleted;

        this.createdAt = DateValidator(user.createdAt).value || new Date();
        validationMap.createdAt = DateValidator(user.createdAt).error;

        this.updatedAt = DateValidator(user.updatedAt).value || new Date();
        validationMap.updatedAt = DateValidator(user.updatedAt).error;

        this.bearer = StringValidator(user.bearer).value || "";
        validationMap.bearer = StringValidator(user.bearer).error;

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<UserValidationMap>("Invalid types", validationMap);
            }
        }
    }
}
