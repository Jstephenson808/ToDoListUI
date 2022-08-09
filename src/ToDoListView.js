import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import ToDoRequestService from './ToDoRequestService';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ToDoListView() {
  const [addButtonOpenFlag, setAddButtonOpenFlag] = useState(false);
  const [addItemTextBoxValue, setAddItemTextBoxValue] = useState('');
  const [editItemTextBoxValue, setEditItemTextBoxValue] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [editItemOpenFlag, setEditItemOpenFlag] = useState(false);
  const [currentToDo, setCurrentToDo] = useState({ id: 1, name: 'Item 1' });

  useEffect(() => {
    ToDoRequestService.getAllToDos().then((response) => {
      setToDoList(response.data);
    });
  }, []);

  const handleAddOpen = () => {
    setAddButtonOpenFlag(true);
  };

  const handleAddClose = () => {
    setAddButtonOpenFlag(false);
    setAddItemTextBoxValue('');
  };

  const handleSave = () => {
    ToDoRequestService.saveToDo(addItemTextBoxValue).then((response) => {
      const updatedToDos = [...toDoList, response.data];
      setToDoList(updatedToDos);
    });
    handleAddClose();
  };

  const handleEditOpen = (itemToEdit) => {
    setCurrentToDo(itemToEdit);
    setEditItemTextBoxValue(itemToEdit.name);
    setEditItemOpenFlag(true);
  };
  const handleDelete = (itemToDeleteId) => {
    ToDoRequestService.deleteToDo(itemToDeleteId)
      // eslint-disable-next-line no-unused-vars
      .then(() => {
        setToDoList(toDoList.filter((toDo) => toDo.id !== itemToDeleteId));
      });
  };
  const handleEditSave = () => {
    currentToDo.name = editItemTextBoxValue;
    ToDoRequestService.editToDo(currentToDo);
    handleEditClose();
  };
  const handleEditClose = () => {
    setEditItemOpenFlag(false);
  };

  return (
    <>
      <List aria-label="main-todo-list">
        {toDoList.map((item) => (
          <ListItem key={item.id} aria-label={'list-item-' + item.id}>
            <ListItemText primary={item.name} />
            <IconButton aria-label="edit" onClick={() => handleEditOpen(item)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleAddOpen}>Add</Button>

      <Dialog open={addButtonOpenFlag}>
        <DialogTitle>Add New To Do</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter To Do here"
            value={addItemTextBoxValue}
            onChange={(event) => setAddItemTextBoxValue(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editItemOpenFlag}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit To Do here"
            value={editItemTextBoxValue}
            onChange={(event) => setEditItemTextBoxValue(event.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <IconButton aria-label={'Save'} onClick={handleEditSave}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label={'Cancel'}>
            <CancelIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
