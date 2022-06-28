import {render, screen} from "@testing-library/react";
import DoMe from "./DoMe";
import userEvent from "@testing-library/user-event";

const addButton = () => screen.getByRole('button', {name: 'add-button'});
const cancelAddButton = () => screen.getByRole('button', {name: 'cancel-add'});



describe('Do Me', () => {
    beforeEach(() => {
        render(<DoMe/>);
    })
    it('should have an add button', () => {
     expect(addButton()).toBeInTheDocument()
    })
    it('should open dialog when button is pressed', () => {
       userEvent.click(addButton());

        expect(addButton()).toBeInTheDocument();
    })
    it('add dialog should have cancel button', () => {
        userEvent.click(addButton());

        expect(cancelAddButton()).toBeInTheDocument();
    })
})
