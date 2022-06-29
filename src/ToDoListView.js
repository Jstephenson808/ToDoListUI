import {Button, Dialog, DialogContent, DialogTitle, List, ListItem, TextField} from "@mui/material";
import {useState} from "react";

//TODO Convert tests to things which users see not internal labels

// eslint-disable-next-line react/display-name
export default function () {
    const [addButtonOpenFlag, setAddButtonOpenFlag] = useState(false);
    const [addItemTextBoxValue, setAddItemTextBoxValue] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [nextId, setNextId] = useState(0)

    const handleClose = () => {
        setAddButtonOpenFlag(false);
        setAddItemTextBoxValue('');
    }

    const handleSave = () => {
        setToDoList(toDoList.concat(createToDoObject(addItemTextBoxValue)));
        handleClose();
    }

    const createToDoObject = (textBoxValue) => {
        const id = handleID();
        const toDo = { id: id, value: textBoxValue};
        return toDo;
    }

    const handleID = () => {
        const id = nextId;
        setNextId(id+1);
        return id;
    }


    return (
        <>
            <List>
                {toDoList.map((toDo) => (<ListItem key={toDo.id}> {(toDo.value)} </ListItem>))}
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
                        onChange={(event) => setAddItemTextBoxValue(event.target.value)}
                    />
                </DialogContent>
                <Button onClick={handleClose} aria-label={'cancel-add'}>Cancel</Button>
                <Button onClick={handleSave} aria-label={'save-to-do'}>Save</Button>
            </Dialog>

        </>
    );
}