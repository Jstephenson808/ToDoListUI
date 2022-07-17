import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import DoMe from './ToDoListView';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const addButton = () => screen.getByText('Add');
const cancelAddToDoButton = () => screen.getByText('Cancel');
const addToDoDialog = () => screen.queryByRole('dialog');
const addToDoTextBox = () => screen.getByLabelText('Enter To Do here');
const saveToDoButton = () => screen.getByText('Save');
const getMainToDoList = () => screen.getByRole('list', { id: 'mainToDoList' });

jest.mock('axios');

describe('To Do List', () => {
  beforeEach(async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    axios.get.mockResolvedValue({ data: toDos });
    await act(async () => {
      render(<DoMe />);
    });
  });
  it('should have an add button', () => {
    expect(addButton()).toBeInTheDocument();
  });
  it('should contain a list', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should fetch data', () => {
    expect(axios.get).toHaveBeenCalledWith('/todos');
  });
  it('should contain ToDo List', () => {
    expect(getMainToDoList()).toBeInTheDocument();
  });
  it('should display ToDos', () => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  // ToDo make this more specific
  it('should have edit button on ToDo list', () => {
    expect(screen.getByRole('list', { id: 'mainToDoList' })).toHaveTextContent('edit');
  });

  describe('Add To Do dialog', () => {
    beforeEach(() => {
      userEvent.click(addButton());
    });
    it('should open dialog when button is pressed', () => {
      expect(addToDoDialog()).toBeInTheDocument();
    });
    it('should have a text box in add dialog', () => {
      expect(addToDoTextBox()).toBeInTheDocument();
    });
    it('should have a save button in add dialog', () => {
      expect(saveToDoButton()).toBeInTheDocument();
    });
    it('add dialog should have cancel button', () => {
      expect(cancelAddToDoButton()).toBeInTheDocument();
    });

    it('should display typed text in textbox', () => {
      userEvent.type(addToDoTextBox(), 'test');

      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });

    it('should close dialog when cancel is pressed', (done) => {
      userEvent.click(cancelAddToDoButton());

      waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
        expect(screen.queryByText('Add New To Do')).not.toBeInTheDocument();
        done();
      });
    });

    it('should post on save', () => {
      axios.post.mockImplementation(() => new Promise(jest.fn()));

      userEvent.type(addToDoTextBox(), 'Item');
      userEvent.click(saveToDoButton());

      expect(axios.post).toHaveBeenCalledWith('/todos', { addItemTextBoxValue: 'Item' });
    });
    it('should clear the add to do text box when cancel is pressed', (done) => {
      userEvent.type(addToDoTextBox(), 'test todo');
      userEvent.click(cancelAddToDoButton());

      waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
        userEvent.click(addButton());
        expect(addToDoTextBox()).toHaveValue('');
        done();
      });
    });
    it('should add to list on user input', async () => {
      axios.post.mockResolvedValue({
        data: {
          id: 3,
          name: 'Item 3',
        },
      });

      userEvent.type(addToDoTextBox(), 'Item 3');

      await act(async () => {
        userEvent.click(saveToDoButton());
      });

      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  // describe('Axios', () => {
  //     it('should fetch data', () =>{
  //         const toDos = [
  //             {name: 'Item 1'},
  //             {name: 'Item 2'}];
  //
  //         axios.get.mockImplementationOnce(() => Promise.resolve(toDos))
  //
  //         expect(axios.get).toHaveBeenCalledWith('/todos');
  //     })
  // });
});
