import {Button} from "@mui/material";
import {useState} from "react";

// eslint-disable-next-line react/display-name
export default function () {
    const [addButtonOpenFlag, setAddButtonOpenFlag] = useState(false);

    return (
        <>
            <Button aria-label={'add-button'} onClick={() =>{
                setAddButtonOpenFlag(true);
            }}>
                Add
            </Button>
            <dialog open={addButtonOpenFlag} aria-label={'add-new-to-do'}>
                Add New To Do
                <Button aria-label={'cancel-add'} onClick={() => {
                    setAddButtonOpenFlag(false);
                }}>
                    Cancel
                </Button>
            </dialog>
        </>
            );
}