/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 04.11.2020, 22:38
 * All rights reserved.
 */

import {useSnackbar} from "notistack";

export default function useEnqueueSuccessSnackbar() {
    const {enqueueSnackbar} = useSnackbar();

    return (message: string) => enqueueSnackbar(message, {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
        },
        variant: "success",
    });
}