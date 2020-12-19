/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project. 
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 19.12.2020, 17:28
 * All rights reserved.
 */

import React, {Ref, useState} from "react";
import {Button, Dialog, DialogTitle, List, ListItem, TextField, withStyles,} from "@material-ui/core";
import Stylable from "../../../../interfaces/Stylable";
import styles from "./styles";
import validate from "validate.js";
import useEnqueueErrorSnackbar from "../../../../utils/enqueueErrorSnackbar";

interface DialogAddFrameRangeProps extends Stylable {
    open: boolean;

    onClose(): void;

    onAddFrame(frame: FrameRange): void;

}

interface ErrorValidation {
    errorStart: boolean,
    errorEnd: boolean,
    errorStep: boolean,
    errorRenumberStart: boolean,
    errorRenumberStep: boolean,
}

interface FrameRange {
    start: number,
    end: number,
    step: number,
    renumberStart: number,
    renumberStep: number,
}

const DialogAddFrameRange = React.forwardRef((props: DialogAddFrameRangeProps, ref: Ref<any>) => {
    const {
        classes,
        style,
        className,
        open,
        onClose,
        onAddFrame
    } = props;


    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();


    const [frame, setFrame] = useState<FrameRange>({
        start: 0,
        end: 10,
        step: 1,
        renumberStart: 0,
        renumberStep: 1,
    });
    const [errors, setErrors] = useState<ErrorValidation>({
        errorStart: false,
        errorEnd: false,
        errorStep: false,
        errorRenumberStart: false,
        errorRenumberStep: false,
    });


    const handleAddFrame = () => {
        if(!errors.errorStart && !errors.errorEnd && !errors.errorStep && !errors.errorRenumberStart && !errors.errorRenumberStep) {
            onAddFrame(frame);
            onClose();
        } else {
            enqueueErrorSnackbar("Invalid Input");
        }
    };

    const handleChangeFrame = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (validate.isInteger(+event.target.value)) {
            setFrame((prev) => ({...prev, [event.target.name]: +event.target.value}));
        }
    };

    const handleValidation = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.name === "start") {
            if (frame.start < 0) {
                setErrors(prev => ({
                    ...prev, "errorStart": true
                }));

            } else {
                setErrors(prev => ({
                    ...prev, "errorStart": false
                }));
            }
        }
        if (event.target.name === "end") {
            if (frame.end < 0) {
                setErrors(prev => ({
                    ...prev, "errorEnd": true
                }));

            } else {
                setErrors(prev => ({
                    ...prev, "errorEnd": false
                }));
            }
        }
        if (event.target.name === "step") {
            if (frame.step <= 0) {
                setErrors(prev => ({
                    ...prev, "errorStep": true
                }));

            } else {
                setErrors(prev => ({
                    ...prev, "errorStep": false
                }));
            }
        }
        if (event.target.name === "renumberStart") {
            if (frame.renumberStart < 0) {
                setErrors(prev => ({
                    ...prev, "errorRenumberStart": true
                }));

            } else {
                setErrors(prev => ({
                    ...prev, "errorRenumberStart": false
                }));
            }
        }
        if (event.target.name === "renumberStep") {
            if (frame.renumberStep <= 0) {
                setErrors(prev => ({
                    ...prev, "errorRenumberStep": true
                }));

            } else {
                setErrors(prev => ({
                    ...prev, "errorRenumberStep": false
                }));
            }
        }
        if (event.target.name === "start" || event.target.name === "end") {
            if (frame.start > frame.end) {
                setErrors(prev => ({
                    ...prev, "errorStart": true, "errorEnd": true,
                }));
            } else {
                setErrors(prev => ({
                    ...prev, "errorStart": false, "errorEnd": false,
                }));
            }
        }
    };


    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
        >
            <DialogTitle className={classes.title}>
                Frame range
            </DialogTitle>

            <List className={classes.dialogContainer}>
                <ListItem>
                    <TextField
                        error={errors.errorStart}
                        fullWidth
                        label="Frame start"
                        name="start"
                        value={frame.start}
                        onChange={handleChangeFrame}
                        onBlur={handleValidation}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        error={errors.errorEnd}
                        fullWidth
                        label="Frame end"
                        name="end"
                        value={frame.end}
                        onChange={handleChangeFrame}
                        onBlur={handleValidation}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        error={errors.errorStep}
                        fullWidth
                        label="Step"
                        name="step"
                        value={frame.step}
                        onChange={handleChangeFrame}
                        onBlur={handleValidation}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        error={errors.errorRenumberStart}
                        fullWidth
                        label="Renumber Start"
                        name="renumberStart"
                        value={frame.renumberStart}
                        onChange={handleChangeFrame}
                        onBlur={handleValidation}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        error={errors.errorRenumberStep}
                        fullWidth
                        label="Renumber step"
                        name="renumberStep"
                        value={frame.renumberStep}
                        onChange={handleChangeFrame}
                        onBlur={handleValidation}
                    />
                </ListItem>
            </List>

            <Button
                className={classes.addButton}
                onClick={handleAddFrame}
                variant="outlined"
            >
                Add Frame range
            </Button>

        </Dialog>
    );
});

export default withStyles(styles)(DialogAddFrameRange);