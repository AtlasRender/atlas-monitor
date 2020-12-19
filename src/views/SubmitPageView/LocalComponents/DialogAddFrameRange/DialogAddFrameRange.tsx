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

interface DialogAddFrameRangeProps extends Stylable {
    open: boolean;

    onClose(): void;

    onAddFrame(frame: FrameRange): void;

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


    const [frame, setFrame] = useState<FrameRange>({
        start: 0,
        end: 10,
        step: 1,
        renumberStart: 0,
        renumberStep: 1,
    });


    const handleAddFrame = () => {
        onAddFrame(frame);
        onClose();
    }

    const handleChangeFrame = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (validate.isInteger(+event.target.value)) {
            setFrame((prev) => ({...prev, [event.target.name]: +event.target.value}));
        }
    }


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
                       fullWidth
                       label="Frame start"
                       name="start"
                       value={frame.start}
                       onChange={handleChangeFrame}
                   />
               </ListItem>
                <ListItem>
                    <TextField
                        fullWidth
                        label="Frame end"
                        name="end"
                        value={frame.end}
                        onChange={handleChangeFrame}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        fullWidth
                        label="Step"
                        name="step"
                        value={frame.step}
                        onChange={handleChangeFrame}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        fullWidth
                        label="Renumber Start"
                        name="renumberStart"
                        value={frame.renumberStart}
                        onChange={handleChangeFrame}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        fullWidth
                        label="Renumber step"
                        name="renumberStep"
                        value={frame.renumberStep}
                        onChange={handleChangeFrame}
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