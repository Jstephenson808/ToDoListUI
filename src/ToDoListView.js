import {Button, Dialog, DialogContent, DialogTitle, List, ListItem, TextField} from "@mui/material";
import {useState} from "react";

// eslint-disable-next-line react/display-name
export default function () {
    const [addButtonOpenFlag, setAddButtonOpenFlag] = useState(false);
    const [addItemTextBoxValue, setAddItemTextBoxValue] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => {
        setErrorMessage('')
        setAddButtonOpenFlag(false);
        setAddItemTextBoxValue('');
    }

    const handleSave = () => {
        if(addItemTextBoxValue.length === 0){
            handleError('Input is empty');

        }
        if(addItemTextBoxValue.length > 100){
            handleError('Input is greater than 100 chars');
        }
        else{
        setToDoList(toDoList.concat(createToDoObject(addItemTextBoxValue)));
        handleClose();}
    }

    const handleError = (error) => {
        setAddItemTextBoxValue('');
        setErrorMessage(error);
    }

    const createToDoObject = (textBoxValue) => {
        const toDo = {
            name: textBoxValue
        };
        return toDo;
    }

    return (
        <>
            <List>
                {toDoList.map((toDo) =>
                    (<ListItem key={toDo.name}> {(toDo.name)} </ListItem>))
                }
            </List>
            <Button aria-label={'add-button'} onClick={() => {
                setAddButtonOpenFlag(true);
            }}>
                Add
            </Button>

            <Dialog open={addButtonOpenFlag} aria-label={'add-new-to-do'}>
                <DialogTitle>Add New To Do</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Enter To Do here"
                        value={addItemTextBoxValue}
                        helperText={errorMessage}
                        onChange={(event) => setAddItemTextBoxValue(event.target.value)}
                    />
                </DialogContent>
                <Button onClick={handleClose} aria-label={'cancel-add'}>Cancel</Button>
                <Button onClick={handleSave} aria-label={'save-to-do'}>Save</Button>
            </Dialog>

        </>
    );
}