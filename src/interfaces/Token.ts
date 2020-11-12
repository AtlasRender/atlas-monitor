/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */


/**
 * Token - type for Token.
 * @interface
 * @author Andrii Demchyshyn
 */
export default interface Token{
    /**
     * id - token id
     */
    id: number,
    /**
     * name - token name.
     */
    name: string,
    /**
     * description - token description.
     */
    description: string,
    /**
     * createdAt - timestamp of token creation.
     */
    createdAt: Date,
    /**
     * token - token value
     */
    token?: string,
}
