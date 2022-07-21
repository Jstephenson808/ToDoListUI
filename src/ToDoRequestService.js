import axios from 'axios';

export class ToDoRequestService {
  constructor() {
    // eslint-disable-next-line no-undef
    this.TODO_API_URL = process.env.REACT_APP_API_URL + '/todos';
  }

  getAllToDos() {
    let data;
    // eslint-disable-next-line no-undef
    axios.get(this.TODO_API_URL).then((response) => {
      data = response.data;
    });
    return data;
  }
}
