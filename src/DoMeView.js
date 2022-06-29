import {Button, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";

// eslint-disable-next-line react/display-name
export default function () {
    const [addButtonOpenFlag, setAddButtonOpenFlag] = useState(false);
    const handleClose = () => {
        setAddButtonOpenFlag(false);
    }

    return (
        <>
            <Button aria-label={'add-button'} onClick={() =>{
                setAddButtonOpenFlag(true);
            }}>
                Add
            </Button>
            <dialog open={addButtonOpenFlag} aria-label={'add-new-to-do'}>
            <DialogTitle>Add New To Do</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Enter To Do here"
                        value = {name}
                    />
                </DialogContent>
                <Button onClick={handleClose} aria-label={'cancel-add'}>Cancel</Button>
            </dialog>

        </>
            );
}