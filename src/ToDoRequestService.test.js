import axios from 'axios';
import ToDoRequestService from './ToDoRequestService';
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
    ToDoRequestService.getAllToDos();

    expect(axios.get).toBeCalledWith('/todos');
  });
  it('should return todos list when getAllToDos is called', async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    const response = await act(async () => {
      return ToDoRequestService.getAllToDos();
    });

    expect(response.data).toStrictEqual(toDos);
  });
  it('should post todos when saveToDo is called', () => {
    axios.post.mockImplementation(() => new Promise(jest.fn()));

    ToDoRequestService.saveToDo('Item');

    expect(axios.post).toHaveBeenCalledWith('/todos', { name: 'Item' });
  });
});
