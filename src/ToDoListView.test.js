import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import DoMe from './ToDoListView';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ToDoRequestService from './ToDoRequestService';

const addButton = () => screen.getByText('Add');
const cancelAddToDoButton = () => screen.getByText('Cancel');
const addToDoDialog = () => screen.queryByRole('dialog');
const addToDoTextBox = () => screen.getByLabelText('Enter To Do here');
const saveToDoButton = () => screen.getByText('Save');
const getMainToDoList = () => screen.getByRole('list');
const itemOneDeleteButton = () =>
  within(screen.getByText('Item 1').closest('li')).getByRole('button', { name: 'delete' });

jest.mock('./ToDoRequestService');

describe('To Do List View', () => {
  beforeEach(async () => {
    const toDos = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    ToDoRequestService.getAllToDos.mockResolvedValue({ data: toDos });
    await act(async () => {
      render(<DoMe />);
    });
  });
  describe('Main To Do List', () => {
    it('should have an add button', () => {
      expect(addButton()).toBeInTheDocument();
    });
    it('should contain a list', () => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should fetch data', () => {
      expect(ToDoRequestService.getAllToDos).toHaveBeenCalled();
    });

    it('should display main todo list', () => {
      expect(getMainToDoList()).toBeInTheDocument();
    });

    it('should display ToDos', () => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('list elements should contain delete button', () => {
      const buttons = within(getMainToDoList()).getAllByRole('button', { name: 'delete' });

      expect(buttons).toHaveLength(2);
    });

    it('list elements should contain edit button', () => {
      const buttons = within(getMainToDoList()).getAllByRole('button', { name: 'edit' });

      expect(buttons).toHaveLength(2);
    });
  });
  describe('Add', () => {
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
      ToDoRequestService.saveToDo.mockImplementation(() => new Promise(jest.fn()));

      userEvent.type(addToDoTextBox(), 'Item');
      userEvent.click(saveToDoButton());

      expect(ToDoRequestService.saveToDo).toHaveBeenCalledWith('Item');
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
      ToDoRequestService.saveToDo.mockResolvedValue({
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
  describe('Delete', () => {
    it('delete button should send delete request', () => {
      ToDoRequestService.deleteToDo.mockImplementation(() => new Promise(jest.fn()));
      userEvent.click(itemOneDeleteButton());

      expect(ToDoRequestService.deleteToDo).toBeCalledWith(1);
    });

    it('delete response should remove item from list', async () => {
      ToDoRequestService.deleteToDo.mockResolvedValue({});

      await act(async () => {
        userEvent.click(itemOneDeleteButton());
      });

      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
  });
  describe('Edit', () => {
    it('should open edit dialogue box when clicked', () => {
      userEvent.click(within(screen.getByText('Item 1').closest('li')).getByRole('button', { name: 'edit' }));

      expect(screen.queryByText('Edit To Do')).toBeInTheDocument();
    });
    it('should contain text box with To Do name', () => {
      userEvent.click(within(screen.getByText('Item 1').closest('li')).getByRole('button', { name: 'edit' }));

      expect(screen.queryByText('Item 1')).toBeInTheDocument();
    });
  });
});
