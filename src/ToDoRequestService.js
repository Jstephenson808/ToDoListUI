import RestClient from './RestClient';

const ToDoRequestService = {
  getAllToDos() {
    return RestClient.get('/todos');
  },

  saveToDo(name) {
    return RestClient.post('/todos', { name });
  },

  deleteToDo(id) {
    return RestClient.delete('/todos/' + id);
  },
  editToDo(newToDo) {
    return RestClient.patch('/todos/' + newToDo.id, { name: newToDo.name });
  },
};

export default ToDoRequestService;
