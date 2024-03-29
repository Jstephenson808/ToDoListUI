import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import DoMe from './ToDoListView';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ToDoRequestService from './ToDoRequestService';

const addButton = () => screen.getByText('Add');
const cancelAddToDoButton = () => screen.getByText('Cancel');
const addToDoDialog = () => screen.queryByRole('dialog');
const addToDoTextBox = () => screen.getByLabelText('Enter To Do Here');
const saveToDoButton = () => screen.getByText('Save');
const getMainToDoList = () => screen.getByRole('list');
const itemOneDeleteButton = () =>
  within(screen.getByText('Item 1').closest('li')).getByRole('button', { name: 'delete' });
const editButton = (itemName) => within(screen.getByText(itemName).closest('li')).getByRole('button', { name: 'edit' });
const editTextBox = () => screen.getByLabelText('Edit To Do Here');

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
  describe('Edit Dialog', () => {
    beforeEach(() => {
      userEvent.click(editButton('Item 1'));
    });
    it('should open edit dialogue box when clicked', () => {
      expect(screen.queryByText('Edit')).toBeInTheDocument();
    });
    it('should contain text box', () => {
      expect(editTextBox()).toBeInTheDocument();
    });
    it('text box should contain To Do name', () => {
      expect(editTextBox()).toHaveValue('Item 1');
    });
    it('dialog should contain save button', () => {
      expect(screen.getByRole('button', { name: 'Save' }));
    });
    it('dialog should contain cancel button', () => {
      expect(screen.getByRole('button', { name: 'Cancel' }));
    });
    it('should display value typed in text box', () => {
      userEvent.clear(editTextBox());
      userEvent.type(editTextBox(), 'Hello World!');

      expect(screen.getByDisplayValue('Hello World!')).toBeInTheDocument();
    });
    describe('Save Change', () => {
      it('should call service when save button is pressed', () => {
        ToDoRequestService.editToDo.mockImplementation(() => new Promise(jest.fn()));
        userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(ToDoRequestService.editToDo).toBeCalledWith({ id: 1, name: 'Item 1' });
      });
      it('should set response object to the edited ToDo in array', async () => {
        ToDoRequestService.editToDo.mockResolvedValue({});
        userEvent.clear(editTextBox());
        userEvent.type(editTextBox(), 'Edited Item');

        await act(async () => {
          userEvent.click(screen.getByRole('button', { name: 'Save' }));
        });

        expect(screen.getByText('Edited Item')).toBeInTheDocument();
      });
    });
    describe('Cancel Change', () => {
      it('should close dialog on cancel', async () => {
        await act(async () => {
          userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        });

        expect(screen.queryByRole('dialog')).not.toBeVisible();
      });
      it('should not change ToDo when closed', async () => {
        userEvent.clear(editTextBox());
        userEvent.type(editTextBox(), 'Edited Item');

        await act(async () => {
          userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        });

        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });
    });
  });
});
