import {Button} from "@mui/material";
import {useState} from "react";

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
            </dialog>
        </>
            );
}