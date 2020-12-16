/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 16.12.2020, 17:06
 * All rights reserved.
 */

export default interface RoleToCreate{
    name: string,
    description?: string,
    permissionLevel: number,
    color: string,
    canManageUsers: boolean,
    canCreateJobs: boolean,
    canEditJobs: boolean,
    canDeleteJobs: boolean,
    canManageRoles: boolean,
    canManagePlugins: boolean,
    canManageTeams: boolean,
    canEditAudit: boolean,
}