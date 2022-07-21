import axios from 'axios';

const ToDoRequestService = {
  // eslint-disable-next-line no-undef
  TODO_API_URL: process.env.REACT_APP_API_URL + '/todos',

  getAllToDos() {
    // eslint-disable-next-line no-undef
    return axios.get(this.TODO_API_URL);
  },

  saveToDo(name) {
    return axios.post(this.TODO_API_URL, { name: name });
  },
};

export default ToDoRequestService;
