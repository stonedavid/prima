import React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

const Modal = ({open,handleOpen,handleClose}) => {
        const actions = [
            <RaisedButton
                label="Close"
                onTouchTap={handleClose}
                fullWidth={true}
              />
            ];

    return (
        <div>
            <Dialog
                title="Congratulations! Lesson Completed!"
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={handleClose}>
                The actions in this window were passed in as an array of React objects.
            </Dialog>
        </div>
    )
};

export default Modal;
