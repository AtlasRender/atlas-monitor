/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Nikita Nesterov
 * Project: pathfinder-monitor
 * File last modified: 17.10.2020, 20:21
 * All rights reserved.
 */

import {useSnackbar} from "notistack";

export default function useEnqueueSuccessSnackbar() {
    const {enqueueSnackbar} = useSnackbar();

    return (message:string) => enqueueSnackbar(message, {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
        },
        variant: "success",
    });
}