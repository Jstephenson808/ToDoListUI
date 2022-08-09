import ToDoRequestService from './ToDoRequestService';
import { act } from 'react-dom/test-utils';
import RestClient from './RestClient';

jest.mock('./RestClient');

describe('To Do List Service', () => {
  beforeAll(() => {});
  it('should call RestClient get when getAllToDos is called', () => {
    ToDoRequestService.getAllToDos();

    expect(RestClient.get).toBeCalledWith('/todos');
  });
  it('should return todos list when getAllToDos is called', async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    RestClient.get.mockResolvedValue({ data: toDos });
    const response = await act(async () => {
      return ToDoRequestService.getAllToDos();
    });

    // eslint-disable-next-line no-undef
    expect(response.data).toStrictEqual(toDos);
  });
  it('should post todos when saveToDo is called', () => {
    RestClient.post.mockImplementation(() => new Promise(jest.fn()));

    ToDoRequestService.saveToDo('Item');

    expect(RestClient.post).toHaveBeenCalledWith('/todos', { name: 'Item' });
  });
  it('should send delete request when deleteToDo is called', () => {
    RestClient.delete.mockImplementation(() => new Promise(jest.fn));

    ToDoRequestService.deleteToDo(1);

    expect(RestClient.delete).toHaveBeenCalledWith('/todos/1');
  });
  it('should send patch request when editToDo is called', () => {
    RestClient.patch.mockImplementation(() => new Promise(jest.fn));

    ToDoRequestService.editToDo({ id: 1, name: 'Item 1' });

    expect(RestClient.patch).toBeCalledWith('/todos/1', { data: { id: 1, name: 'Item 1' } });
  });
});
