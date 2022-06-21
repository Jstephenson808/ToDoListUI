import {render, screen} from "@testing-library/react";
import DoMe from "./DoMe";

describe('Do Me', () => {
    it('should have an add button', () => {
        render(<DoMe />);
        expect(screen.getByLabelText('add_button')).toBeInTheDocument();
    })
})