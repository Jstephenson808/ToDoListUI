import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToDoRequestService } from './ToDoRequestService';

export default function ToDoListView() {
  const [addButtonOpenFlag, setAddButtonOpenFlag] = useState(false);
  const [addItemTextBoxValue, setAddItemTextBoxValue] = useState('');
  const [toDoList, setToDoList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [toDoRequestService, setToDoRequestService] = useState(new ToDoRequestService());

  useEffect(() => {
    toDoRequestService.getAllToDos().then((response) => {
      setToDoList(response.data);
    });
  }, []);

  const handleClickOpen = () => {
    setAddButtonOpenFlag(true);
  };

  const handleClose = () => {
    setAddButtonOpenFlag(false);
    setAddItemTextBoxValue('');
  };

  const handleSave = () => {
    axios
      // eslint-disable-next-line no-undef
      .post(process.env.REACT_APP_API_URL + `/todos`, {
        name: addItemTextBoxValue,
      })
      .then((response) => {
        const updatedToDos = [...toDoList, response.data];
        setToDoList(updatedToDos);
      });
    handleClose();
  };

  const handleDelete = (itemToDeleteId) => {
    axios
      // eslint-disable-next-line no-undef
      .delete(process.env.REACT_APP_API_URL + `/todos/` + itemToDeleteId)
      // eslint-disable-next-line no-unused-vars
      .then(() => {
        setToDoList(toDoList.filter((toDo) => toDo.id !== itemToDeleteId));
      });
  };

  return (
    <>
      <List aria-label="main-todo-list">
        {toDoList.map((item) => (
          <ListItem key={item.id} aria-label={'list-item-' + item.id}>
            <ListItemText primary={item.name} />
            <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button aria-label={'add-button'} onClick={handleClickOpen}>
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
        <Button onClick={handleClose} aria-label={'cancel-add'}>
          Cancel
        </Button>
        <Button onClick={handleSave} aria-label={'save-to-do'}>
          Save
        </Button>
      </Dialog>
    </>
  );
}
