import axios from 'axios';
import { ToDoRequestService } from './ToDoRequestService';

jest.mock('axios');

describe('To Do List Service', () => {
  it('should call axios get when getAllToDos is called', () => {
    const toDoRequestService = new ToDoRequestService();
    axios.get.mockResolvedValue('');

    toDoRequestService.getAllToDos();

    expect(axios.get).toBeCalledWith('/todos');
  });
});
