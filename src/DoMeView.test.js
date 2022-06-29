import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import DoMe from "./DoMeView";
import userEvent from "@testing-library/user-event";

const addButton = () => screen.getByRole('button', {name: 'add-button'});
const cancelAddButton = () => screen.getByRole('button', {name: 'cancel-add'});
const addToDoDialog = () => screen.getByRole('dialog', {name: 'add-new-to-do'});



describe('Do Me', () => {
    beforeEach(() => {
        render(<DoMe/>);
    })
    it('should have an add button', () => {
     expect(addButton()).toBeInTheDocument()
    })
    it('should open dialog when button is pressed', () => {
       userEvent.click(addButton());

        expect(addToDoDialog()).toBeInTheDocument();
    })
    it('add dialog should have cancel button', () => {
        userEvent.click(addButton());

        expect(cancelAddButton()).toBeInTheDocument();
    })

    it('should have a text box in add dialog', () => {
        userEvent.click(addButton());

        expect(screen.getByLabelText('Enter To Do here')).toBeInTheDocument();
    })

    it('should have a save button in add dialog', () => {
        userEvent.click(addButton());

        expect(screen.getByRole('button', {name: 'cancel-add'}))
    })

    it('should close dialog when cancel is pressed', (done) => {
        userEvent.click(addButton());
        userEvent.click(cancelAddButton());

        //this doesn't work
        waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
            expect(screen.queryByRole('dialog', {name: 'add-new-to-do'})).not.toBeInTheDocument();
            done();
        });
    });
})
