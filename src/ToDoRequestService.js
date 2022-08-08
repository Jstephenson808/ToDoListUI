import RestClient from './RestClient';

const ToDoRequestService = {
  getAllToDos() {
    // eslint-disable-next-line no-undef
    return RestClient.get('/todos');
  },

  saveToDo(name) {
    return RestClient.post('/todos', { name });
  },

  deleteToDo(id) {
    return RestClient.delete('/todos/' + id);
  },
  editToDo(newToDo) {
    return RestClient.patch('/todos/', { name: newToDo });
  },
};

export default ToDoRequestService;
