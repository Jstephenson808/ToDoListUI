import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import DoMe from "./ToDoListView";
import userEvent from "@testing-library/user-event";

const addButton = () => screen.getByText('Add')
const cancelAddToDoButton = () => screen.getByText('Cancel');
const addToDoDialog = () => screen.queryByRole('dialog');
const addToDoTextBox = () => screen.getByLabelText('Enter To Do here');
const saveToDoButton = () => screen.getByText('Save');


//TODO add tests for validating that box is cleared on close of dialog (save and cancel)
//TODO
describe('To Do List', () => {
    beforeEach(() => {
        render(<DoMe/>);
    })
    it('should have an add button', () => {
        expect(addButton()).toBeInTheDocument()
    })
    it('should contain a list', () => {
        expect(screen.getByRole('list')).toBeInTheDocument();
    })

    describe('Add To Do dialog', () => {
        beforeEach(() => {
            userEvent.click(addButton());
        })
        it('should open dialog when button is pressed', () => {
            expect(addToDoDialog()).toBeInTheDocument();
        })
        it('add dialog should have cancel button', () => {
            expect(cancelAddToDoButton()).toBeInTheDocument();
        })

        it('should have a text box in add dialog', () => {
            expect(addToDoTextBox()).toBeInTheDocument();
        })

        it('should have a save button in add dialog', () => {
            expect(saveToDoButton()).toBeInTheDocument();
        })

        it('should display typed text in textbox', () => {
            userEvent.type(addToDoTextBox(), 'test');

            expect(screen.getByDisplayValue('test')).toBeInTheDocument();
        })

        it('should close dialog when cancel is pressed', (done) => {
            userEvent.click(cancelAddToDoButton());

            waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
                expect(screen.queryByText('Add New To Do')).not.toBeInTheDocument();
                done();
            });
        });

        it('should save to do and display when save is pressed', () => {
            userEvent.type(addToDoTextBox(), 'test todo');
            userEvent.click(saveToDoButton());

            expect(screen.getByText('test todo')).toBeInTheDocument();
        });

        it('should clear the add to do text box when cancel is pressed', (done) => {
            userEvent.type(addToDoTextBox(), 'test todo');
            userEvent.click(cancelAddToDoButton());

            waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
                userEvent.click(addButton());
                expect(addToDoTextBox()).toHaveValue('')
                done();
            });
        });
        it('should clear the add to do text box when save is pressed', (done) => {
            userEvent.type(addToDoTextBox(), 'test todo');
            userEvent.click(saveToDoButton());

            waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
                userEvent.click(addButton());
                expect(addToDoTextBox()).toHaveValue('')
                done();
            });
        });
    });
});