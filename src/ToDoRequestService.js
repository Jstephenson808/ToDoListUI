import axios from 'axios';

export class ToDoRequestService {
  constructor() {
    // eslint-disable-next-line no-undef
    this.TODO_API_URL = process.env.REACT_APP_API_URL + '/todos';
  }

  async getAllToDos() {
    // eslint-disable-next-line no-undef
    return axios.get(this.TODO_API_URL);
  }
}
