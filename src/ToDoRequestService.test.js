import axios from 'axios';
import { ToDoRequestService } from './ToDoRequestService';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('To Do List Service', () => {
  beforeEach(() => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    axios.get.mockResolvedValue({ data: toDos });
  });
  it('should call axios get when getAllToDos is called', () => {
    const toDoRequestService = new ToDoRequestService();

    toDoRequestService.getAllToDos();

    expect(axios.get).toBeCalledWith('/todos');
  });
  it('should return todos list when getAllToDos is called', async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    const toDoRequestService = new ToDoRequestService();

    const response = await act(async () => {
      return toDoRequestService.getAllToDos();
    });

    expect(response.data).toStrictEqual(toDos);
  });
});
