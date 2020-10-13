/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Andrii Demchyshyn
 * Project: pathfinder-monitor
 * File last modified: 08.10.2020, 18:24
 * All rights reserved.
 */

import {useSnackbar} from "notistack";

export default function useEnqueueErrorSnackbar() {
    const { enqueueSnackbar } = useSnackbar();

    return (message:string) => enqueueSnackbar(message, {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
        },
        variant: "error",
    });
}