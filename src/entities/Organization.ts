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

/**
 * OrganizationValidationMap - interface for Organization input fields validation.
 * @interface
 * @author Andrii Demchyshyn
 */
export interface OrganizationValidationMap {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ownerUser?: boolean;
}

/**
 * Organization - creates and validates organization entity.
 * @class
 * @author Andrii Demchyshyn
 */
export default class Organization extends BaseEntity {
    /**
     * id - unique value of the organization
     */
    public id: number;
    /**
     * name - organization name
     */
    public name: string;
    /**
     * description - organization description
     */
    public description?: string | null;
    /**
     * createdAt - date of the organization creation
     */
    public createdAt: Date;
    /**
     * updatedAt - date when organization was updated
     */
    public updatedAt: Date;
    /**
     * ownerUser - owner of the organization
     */
    public ownerUser: User;

    /**
     * constructor - creates an instance of the organization entity.
     * @param organization
     * @constructor
     * @throws ValidationError
     * @author Andrii Demchyshyn
     */
    constructor(organization: any) {
        super("Organization");
        const validationMap: OrganizationValidationMap = {};

        this.id = NumberValidator(organization.id).value || 0;
        validationMap.id = NumberValidator(organization.id).error;

        this.name = StringValidator(organization.name).value || "";
        validationMap.name = StringValidator(organization.name).error;

        this.description = StringValidator(organization.description).value;
        validationMap.description = StringValidator(organization.description).error;

        this.createdAt = DateValidator(organization.createdAt).value || new Date();
        validationMap.createdAt = DateValidator(organization.createdAt).error;

        this.updatedAt = DateValidator(organization.updatedAt).value || new Date();
        validationMap.updatedAt = DateValidator(organization.updatedAt).error;

        this.ownerUser = new User({
            id: 1,
            username: "username",
            email: "email",
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            bearer: "bearer",
        });
        try {
            this.ownerUser = new User(organization.ownerUser);
        } catch (error) {
            if (error instanceof ValidationError) {
                validationMap.ownerUser = true;
            }
        }

        for (const key in validationMap) {
            if ((validationMap as any)[key] === true) {
                throw new ValidationError<UserValidationMap>("Invalid types", validationMap);
            }
        }
    }
}
