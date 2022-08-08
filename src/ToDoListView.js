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
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import ToDoRequestService from './ToDoRequestService';

export default function ToDoListView() {
  const [addButtonOpenFlag, setAddButtonOpenFlag] = useState(false);
  const [addItemTextBoxValue, setAddItemTextBoxValue] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [editItemOpenFlag, setEditItemOpenFlag] = useState(false);

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

  const handleEditOpen = () => {
    setEditItemOpenFlag(true);
  };
  const handleDelete = (itemToDeleteId) => {
    ToDoRequestService.deleteToDo(itemToDeleteId)
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
            <IconButton aria-label="edit" onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button aria-label={'add-button'} onClick={handleAddOpen}>
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
        <Button onClick={handleAddClose} aria-label={'cancel-add'}>
          Cancel
        </Button>
        <Button onClick={handleSave} aria-label={'save-to-do'}>
          Save
        </Button>
      </Dialog>

      <Dialog open={editItemOpenFlag} aria-label={'edit-to-do'}>
        <DialogTitle>Edit To Do</DialogTitle>
      </Dialog>
    </>
  );
}
