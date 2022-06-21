import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";

export default function DoMe() {
    const [open, setOpen] = React.useState(false);
    const [currentInputText, setCurrentInputText] = React.useState('');
    const [toDoArray, setToDoArray] = React.useState([]);
    const [checked, setChecked] = React.useState([0]);
    const [nextID, setNextID] = useState(0);


    const createToDo = () => {
        const newToDo = {
            ID: nextID,
            text: currentInputText
        };

        setNextID(nextID + 1);
        const newArray = toDoArray.concat(newToDo);
        setToDoArray(newArray);
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

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];



        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {toDoArray.map((toDoObject) => {
                    if (toDoArray.length === 0){
                        return;
                    }
                    else{
                    const labelId = `toDo-list-label-${toDoObject.ID}`;

                    return (
                        <ListItem
                            key={toDoObject.ID}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <EditIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(toDoObject.ID)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(toDoObject) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={toDoObject.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                }})}
            </List>
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