/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

export default interface Role {
    id: number;
    name: string;
    permissionLevel: number;
    description?: string | null;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    canManageUsers: boolean,
    canCreateJobs: boolean,
    canEditJobs: boolean,
    canDeleteJobs: boolean,
    canManageRoles: boolean,
    canManagePlugins: boolean,
    canManageTeams: boolean,
    canEditAudit: boolean,
    default: boolean,
}