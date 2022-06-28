import {render, screen} from "@testing-library/react";
import DoMe from "./DoMe";
import userEvent from "@testing-library/user-event";

const addButton = () => {
    return screen.getByRole('button', {name: 'add-button'});
}

describe('Do Me', () => {
    it('should have an add button', () => {
        render(<DoMe />);
        expect(addButton()).toBeInTheDocument()
    })
    it('should open dialog when button is pressed', () => {
        render(<DoMe />);

        userEvent.click(addButton());

        expect(screen.getByRole('dialog', {name:'add-new-to-do'})).toBeInTheDocument();
    })
})