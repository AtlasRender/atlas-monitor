/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 18.11.2020, 19:41
 * All rights reserved.
 */

import InputField from "../entities/InputField";
import React, {Dispatch, SetStateAction} from "react";

interface PluginContextProps {
    pluginFields: InputField[];
    setPluginFields: Dispatch<SetStateAction<InputField[]>>,
    idGenerator: () => number;
}

export const PluginContext = React.createContext<PluginContextProps>({
    pluginFields: [],
    setPluginFields: () => {
    },
    idGenerator: (): number => {
        return 1;
    },
});