/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: pathfinder-monitor
 * File last modified: 18.10.2020, 22:43
 * All rights reserved.
 */


import React, {ReactNode} from "react";
import Containerable from "../interfaces/Containerable";
import {Button, Dialog, DialogActions, DialogContentText, DialogTitle} from "@material-ui/core";

/**
 * ConfirmFunction - function to show confirm dialog.
 * @author Danil Andreev
 */
export type ConfirmFunction = (onAccept: () => Promise<void>, settings: ConfirmSettings) => Promise<void>;

const ConfirmContext = React.createContext<ConfirmFunction>(async () => {
});

/**
 * ConfirmProviderProps - interface for ConfirmProvider properties.
 * @interface
 * @author Danil Andreev
 */
export interface ConfirmProviderProps extends Containerable {
    children?: any;
}

/**
 * ConfirmSettings - settings for confirm dialog.
 * @interface
 * @author Danil Andreev
 */
export interface ConfirmSettings {
    title: ReactNode;
    text?: ReactNode;
    accept?: string;
    dismiss?: string;

    onDismiss?(): Promise<void>;
}

/**
 * DialogSettings - interface for inner dialog settings.
 * @ignore
 * @interface
 * @author Danil Andreev
 */
interface DialogSettings extends ConfirmSettings {
    onAccept(): Promise<void>;
}

/**
 * ConfirmProvider - React Provider for confirmation mechanism.
 * @function
 * @author Danil Andreev
 */
export const ConfirmProvider = React.forwardRef((props: ConfirmProviderProps, ref: React.Ref<any>) => {
    const {
        children
    } = props;

    const [content, setContent] = React.useState<DialogSettings | null>(null);
    const [open, setOpen] = React.useState<boolean>(false);

    React.useLayoutEffect(() => {
        setTimeout(() => {
            if (!open) setContent(null);
        }, 100);
    }, [open]);

    React.useLayoutEffect(() => {
        if (content) setOpen(true);
    }, [content]);

    async function confirm(onAccept: () => Promise<void>, settings: ConfirmSettings) {
        setContent({...settings, onAccept});
    }

    return (
        <React.Fragment>
            <Dialog
                id="confirm-dialog"
                aria-labelledby="confirm-dialog"
                onClose={(event: Event) => setOpen(false)}
                open={open}
            >
                <DialogTitle id="confirm-dialog-title">
                    {content?.title}
                </DialogTitle>
                <DialogContentText>
                    {content?.text}
                </DialogContentText>
                <DialogActions>
                    <Button
                        onClick={event => {
                            content && content.onAccept().then()
                            setOpen(false);
                        }}
                    >
                        {content?.accept || "Accept"}
                    </Button>
                    <Button
                        onClick={event => {
                            setOpen(false);
                            content?.onDismiss && content.onDismiss();
                        }}
                    >
                        {content?.dismiss || "Dismiss"}
                    </Button>
                </DialogActions>
            </Dialog>
            <ConfirmContext.Provider value={confirm}>
                {children}
            </ConfirmContext.Provider>
        </React.Fragment>
    );
});

/**
 * useConfirm - react hook for confirm dialog.
 * @function Danil Andreev
 * @author Danil Andreev
 */
const useConfirm = (): ConfirmFunction => React.useContext(ConfirmContext);
export default useConfirm;
