/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-monitor
 * File last modified: 12.11.2020, 18:37
 * All rights reserved.
 */

import React, {Ref, useCallback, useEffect, useState} from "react";
import {
    Button,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    withStyles
} from "@material-ui/core";
import styles from "./styles";
import Stylable from "../../interfaces/Stylable";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import PluginCreation from "./LocalComponents/PluginCreation";
import update from "immutability-helper";
import IdGenerator from "../../utils/IdGenerator";
import FilesLoader from "../../components/FilesLoader";
import BasicPluginField from "../../entities/BasicPluginField";
import GroupField from "../../entities/GroupField";
import {array} from "prop-types";
import useEnqueueErrorSnackbar from "../../utils/enqueueErrorSnackbar";
import useCoreRequest from "../../hooks/useCoreRequest";
import IntegerField from "../../entities/IntegerField";
import {useChangeRoute} from "routing-manager";
import {PluginSetting, PluginSettingsSpec, ValidationError} from "@atlasrender/render-plugin";


interface PluginContextProps {
    pluginFields: (BasicPluginField)[];
    handleAddPluginField: (field: BasicPluginField, id: number) => void,
    handleDeletePluginField: (field: BasicPluginField) => void,
    handleEditPluginField: (field: BasicPluginField, index: number) => void,
    idGenerator: () => number;
    moveField: (inputArray: BasicPluginField[], targetId: number, toId: number, objectToAdd: BasicPluginField, remove: boolean) => BasicPluginField[];
}

export const PluginContext = React.createContext<PluginContextProps>({
    pluginFields: [],
    handleAddPluginField: (field: BasicPluginField, id: number) => {
    },
    handleDeletePluginField: (field: BasicPluginField) => {
    },
    handleEditPluginField: (field: BasicPluginField, index: number) => {
    },
    idGenerator: (): number => {
        return 1;
    },
    moveField: (inputArray: BasicPluginField[], targetId: number, toId: number, objectToAdd: BasicPluginField, remove: boolean = false) => {
        return [];
    }
});


/**
 * CreatePluginPageViewProps - interface for CreatePluginPageView
 * @interface
 * @author Andrii Demchyshyn
 */
interface CreatePluginPageViewProps extends Stylable {

}

interface Plugin {
    name: string,
    version: string,
    note?: string,
    description?: string,
    file: number,
    organization: number,
    fields: BasicPluginField[] | PluginSetting[],
}

/**
 * UserPageView - function for showing create plugin page
 * @function
 * @author Andrii Demchyshyn
 */
const CreatePluginPageView = React.forwardRef((props: CreatePluginPageViewProps, ref: Ref<any>) => {
    const {
        classes,
        className,
        style,
    } = props;

    const enqueueErrorSnackbar = useEnqueueErrorSnackbar();
    const coreRequest = useCoreRequest();
    const idGenerator = React.useRef(IdGenerator());
    const getNextId = (): number => idGenerator.current.next().value;
    const {getRouteParams} = useChangeRoute();
    const {id} = getRouteParams();
    console.log(id);

    function getFileId(id:number){
        setPlugin((prev)=>({...prev, file: id}));
    }

    const [pluginFields, setPluginFields] = useState<BasicPluginField[]>([
        new IntegerField({
            type: "integer",
            name: "",
            label: "Integer Field",
            min: 1,
            max: 255,
            id: getNextId(),
        })
    ]);

    const [plugin, setPlugin] = useState<Plugin>({
        name: "",
        version: "",
        note: "",
        description: "",
        file: 0,
        organization: id,
        fields: pluginFields,
    });

    useEffect(()=>{
        setPlugin((prev) => ({...prev, fields: pluginFields}))
    },[pluginFields])

    const [isDialogPluginButtonActive, setIsDialogPluginButtonActive] = useState(false);

    function handlePluginChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        setPlugin((prev) => ({...prev, [event.target.name]: event.target.value}));
        console.log(plugin);
    }

    function handleCreatePlugin() {
        console.log("hi");
        try{
            const validated = new PluginSettingsSpec(pluginFields);
            // setPlugin((prev)=>({...prev, fields: validated}))
        }catch (error){
            if(error instanceof ValidationError){
                enqueueErrorSnackbar(error.message);
                console.log(error);
            }
            else{
                enqueueErrorSnackbar("Unrecognized error");
            }
            return;
        }
        coreRequest()
            .post("/plugins")
            .send(plugin)
            .then(response => {
                console.log("done");
            })
            .catch(err => {
                enqueueErrorSnackbar("Can`t create plugin");
            });
    }




    const move = useCallback(
        (dragIndex: number, hoverIndex: number, targetId: number, toId: number) => {
            const draggedField = pluginFields[dragIndex];
            setPluginFields(
                update(pluginFields, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, draggedField],
                    ],
                }),
            );
        },
        [pluginFields],
    );

    const a: any[] = [new GroupField({id: 3, nested: [{id: 4}, {id: 5}]}), new GroupField({
        id: 6,
        nested: [{id: 7}]
    })];

    function moveField(inputArray: BasicPluginField[], targetId: number, toId: number, objectToAdd: BasicPluginField, remove: boolean = false): BasicPluginField[] {

        const array = [...inputArray];

        let target: BasicPluginField | null = null;

        function findField(callback: (array: BasicPluginField[], field: number) => BasicPluginField[]) {
            return function findTarget(array: BasicPluginField[], id: number): BasicPluginField[] {
                for (let i = 0; i < array.length; i++) {
                    const field = array[i];
                    if (field.id === id) {
                        return callback(array, i);
                    } else {
                        if (field instanceof GroupField && field.nested) {
                            field.nested = findTarget(field.nested, id);
                        }
                    }
                }
                return array;
            };
        }

        const newArray: BasicPluginField[] = findField((callbackArray, index) => {
            target = callbackArray[index];
            return callbackArray.filter(item => item.id !== callbackArray[index].id);
        })(array, targetId);

        if (remove) {
            return newArray;
        }

        if (!target)
            target = objectToAdd;


        const finalArray: BasicPluginField[] = findField((callbackFinalArray, index) => {
            if (callbackFinalArray[index] instanceof GroupField) {

                if (target) {
                    const callbackResult = (callbackFinalArray[index] as GroupField);
                    if (callbackResult.nested) {
                        callbackResult.nested.push(target);
                    }
                }
            } else {

                let saveFieldTo: BasicPluginField = new BasicPluginField({
                    type: "integer",
                    name: "name",
                    label: "label",
                    id: 1000,
                });

                for (let i = 0; i < callbackFinalArray.length; i++) {
                    if (callbackFinalArray[i].id === toId) {
                        saveFieldTo = callbackFinalArray[i];
                    }
                }

                for (let i = 0; i < callbackFinalArray.length; i++) {
                    if (callbackFinalArray[i].id === toId && target) {
                        callbackFinalArray[i] = target;
                        callbackFinalArray.push(saveFieldTo);
                    }
                }

                // callbackFinalArray.map(field => {
                //     if(targetId === field.id) {
                //         saveField = field;
                //     }
                // });

                // throw new ReferenceError(`field with id ${targetId} is not instance of GroupField`);
            }

            return callbackFinalArray;
        })(array, toId);

        return finalArray;

    }

    // console.log("delete", moveField(a, 4, 3, {id: 8, type: "", name: "", label: ""}));

    // function nameGetter(idArray: number[] | undefined): string{
    //     let name="";
    //     for(const i of idArray){
    //         name += `[${i}].nested`;
    //     }
    //     return name;
    // }

    function handleAddPluginField(field: BasicPluginField, id: number) {
        //setIsDialogPluginButtonActive(false);
        setPluginFields(prev => ([...prev, field]));
        // setPluginFields(moveField(pluginFields, field.id, id, field));
        // console.log("pluginFields", pluginFields);
    }

    function handleEditPluginField(field: BasicPluginField, index: number) {
        const copy = [...pluginFields];
        copy.splice(index, 1, field);
        setPluginFields(copy);
    }

    function handleDeletePluginField(field: BasicPluginField) {
        setPluginFields(pluginFields.filter(pluginField => pluginField.id !== field.id));
        // setPluginFields(moveField(pluginFields, field.id, 0, field, true));
    }

    function handleSetIsDialogPluginButtonActive() {
        setIsDialogPluginButtonActive(true);
    }

    // const a: any[] = [{id: 1}, {id: 2}, new GroupField({id: 3, nested: [{id: 4}, {id: 5}]}), new GroupField({
    //     id: 6,
    //     nested: [{id: 7}]
    // })];
    //
    // function moveField(array: BasicPluginField[], targetId: number, toId: number): BasicPluginField[] {
    //     let target: BasicPluginField | null = null;
    //
    //     function findField(callback: (array: BasicPluginField[], field: number) => BasicPluginField[]) {
    //         return function findTarget(array: BasicPluginField[], id: number): BasicPluginField[] {
    //             for (let i = 0; i < array.length; i++) {
    //                 const field = array[i];
    //                 if(field.id === id) {
    //                     return callback(array, i);
    //                 } else {
    //                     if (field instanceof GroupField) {
    //                         field.nested = findTarget(field.nested, id);
    //                     }
    //                 }
    //             }
    //             return array;
    //         };
    //     }
    //
    //     const newArray: BasicPluginField[] = findField((callbackArray, index) => {
    //         target = callbackArray[index];
    //         return callbackArray.filter(item => item.id !== callbackArray[index].id);
    //     })(array, targetId);
    //
    //     if (!target)
    //         throw new ReferenceError(`field with id ${targetId} does not exist in plugin`);
    //
    //     const finalArray: BasicPluginField[] = findField((callbackFinalArray, index) => {
    //         if (callbackFinalArray[index] instanceof GroupField) {
    //             console.log(target);
    //             if (target) {
    //                 (callbackFinalArray[index] as GroupField).nested.push(target);
    //             }
    //         } else {
    //             throw new ReferenceError(`field with id ${targetId} is not instance of GroupField`);
    //         }
    //
    //         return callbackFinalArray;
    //     })(array, toId);
    //
    //     return finalArray;
    // }
    //
    // console.log("delete", moveField(a, 4, 6));


    return (
        <React.Fragment>

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={plugin.name}
                                onChange={handlePluginChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Version"
                                name="version"
                                value={plugin.version}
                                onChange={handlePluginChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Note"
                                name="note"
                                value={plugin.note}
                                onChange={handlePluginChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={plugin.description}
                                onChange={handlePluginChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FilesLoader multiple getFileId={getFileId}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItem className={classes.paddingNone}>
                            <ListItemText primary="Settings" primaryTypographyProps={{variant: "h6"}}/>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleSetIsDialogPluginButtonActive}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                    </List>
                </Grid>
            </Grid>

            <Grid container className={classes.firstLine}>
                <Grid item xs={12} md={10}>
                    <PluginContext.Provider value={{
                        pluginFields: pluginFields,
                        handleAddPluginField: handleAddPluginField,
                        handleDeletePluginField: handleDeletePluginField,
                        handleEditPluginField: handleEditPluginField,
                        idGenerator: getNextId,
                        moveField: moveField,
                    }}>
                        <PluginCreation
                            open={isDialogPluginButtonActive}
                            onClose={() => setIsDialogPluginButtonActive(false)}
                            onAddField={handleAddPluginField}
                            idGenerator={getNextId}
                            pluginFields={pluginFields}
                            move={move}
                        />
                    </PluginContext.Provider>
                </Grid>

                <Button fullWidth onClick={handleCreatePlugin}>
                    Save
                </Button>
            </Grid>

            {/*<Grid container className={classes.firstLine}>*/}
            {/*    <Grid item xs={12} md={10}>*/}
            {/*        <List>*/}
            {/*            {pluginFields.map((item, index) => (*/}
            {/*                <DragableListItem*/}
            {/*                    key={item.id}*/}
            {/*                    field={item}*/}
            {/*                    index={index}*/}
            {/*                    moveCard={move}*/}
            {/*                    onDelete={handleDeletePluginField}*/}
            {/*                />*/}
            {/*            ))}*/}
            {/*        </List>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}

        </React.Fragment>
    );
});

export default withStyles(styles)(CreatePluginPageView);