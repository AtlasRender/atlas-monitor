/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 15.10.2020, 19:32
 * All rights reserved.
 */

import BaseEntity from "../core/BaseEntity";
import {instanceOf} from "prop-types";

/**
 * User - interface for user data. You can get it from Origin.
 * @interface
 * @author Danil Andreev
 */
export interface UserFields {
    id: number;
    username: string;
    email?: string;
    deleted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    bearer: string;
}

export interface UserValidationMap {
    id?: boolean;
    username?: boolean;
    email?: boolean;
    deleted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bearer?: boolean;
}

export default class User extends BaseEntity{
    public id: number;
    public username: string;
    public email?: string;
    public deleted: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public bearer: string;

    constructor(user: any) {
        super("User");
        const validationMap: UserValidationMap = {}

        if(isNaN(user.id)) {
            validationMap.id = true;
        }
        this.id = +user.id;

        if(typeof user.username !== "string") {
            validationMap.username = true;
        }
        this.username = user.username;

        if(typeof user.email !== "string") {
            validationMap.email = true;
        }
        this.email = user.email;

        if(typeof user.deleted !== "boolean") {
            validationMap.deleted = true;
        }
        this.deleted = user.deleted;

        if(!(typeof user.createdAt === "string" || user.createdAt instanceof Date)) {
            validationMap.createdAt = true;
        }
        this.createdAt = user.createdAt;

        if(!(typeof user.updatedAt === "string" || user.updatedAt instanceof Date)) {
            validationMap.updatedAt = true;
        }
        this.updatedAt = user.updatedAt;

        if(typeof user.bearer !== "string") {
            validationMap.bearer = true;
        }
        this.bearer = user.bearer;

        if ((typeof user.id !== "number") ||
            (typeof user.username !== "string") ||
            (typeof user.email !== "string") ||
            (typeof user.bearer !== "string") ||
            (typeof user.createdAt !== "string") ||
            (typeof user.updatedAt !== "string") ||
            (typeof user.deleted !== "boolean")) {
        }
    }
}