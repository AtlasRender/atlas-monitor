/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 23:46
 * All rights reserved.
 */

import BaseEntity from "../core/BaseEntity";
import NumberValidator from "../core/validators/NumberValidator";
import StringValidator from "../core/validators/StringValidator";
import DateValidator from "../core/validators/DateValidator";
import ValidationError from "../core/ValidationError";
import User, {UserValidationMap} from "./User";

export interface OrganizationValidationMap {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ownerUser?: boolean;
}

export default class Organization extends BaseEntity {
    public id?: number;
    public name?: string;
    public description?: string | null;
    public createdAt?: Date;
    public updatedAt?: Date;
    public ownerUser?: User;

    constructor(organization: any) {
        super("Organization");
        const validationMap: OrganizationValidationMap = {};

        this.id = NumberValidator(organization.id).value;
        validationMap.id = NumberValidator(organization.id).error;

        this.name = StringValidator(organization.name).value;
        validationMap.name = StringValidator(organization.name).error;

        this.description = StringValidator(organization.description).value;
        validationMap.description = StringValidator(organization.description).error;

        this.createdAt = DateValidator(organization.createdAt).value;
        validationMap.createdAt = DateValidator(organization.createdAt).error;

        this.updatedAt = DateValidator(organization.updatedAt).value;
        validationMap.updatedAt = DateValidator(organization.updatedAt).error;

        this.ownerUser = new User(organization.ownerUser);

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<UserValidationMap>("Invalid types", validationMap);
            }
        }
    }
}