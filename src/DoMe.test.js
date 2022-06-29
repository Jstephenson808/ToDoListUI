import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import DoMe from "./DoMe";
import userEvent from "@testing-library/user-event";

const addButton = () => screen.getByRole('button', {name: 'add-button'});
const cancelAddButton = () => screen.getByRole('button', {name: 'cancel-add'});
const addToDoDialog = () => screen.getByRole('dialog', {name: 'add-new-to-do'})



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
    it('should close dialog when cancel is pressed', (done) => {
        userEvent.click(addButton());
        userEvent.click(cancelAddButton());

        //this doesn't work
        waitForElementToBeRemoved(screen.queryByRole('dialog')).then(() => {
            expect(addToDoDialog()).not.toBeInTheDocument();
            done();
        });
    });
})
