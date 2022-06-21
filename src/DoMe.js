import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default function DoMe() {
    const [open, setOpen] = React.useState(false);
    const [currentInputText, setCurrentInputText] = React.useState('');
    const toDoArray = [];
    const ID = 0;

    const createToDo = () => {
        if (toDoArray.length === 0){
            const addedToDo = {
                ID:0,
                text:currentInputText
            };
            toDoArray[0] = addedToDo;
        }
        else {
            const addedToDo = {
                ID: toDoArray.length,
                text: currentInputText
            };

            toDoArray[toDoArray.length - 1] = addedToDo;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddItem = () => {
        createToDo();
        handleClose();
    }

    return (

        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <AcUnitIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ToDo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please type your task here:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter ToDo here"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setCurrentInputText(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddItem}>Add Item</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}