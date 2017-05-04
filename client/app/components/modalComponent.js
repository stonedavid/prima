import React from "react";
import Xp from "./xpComponent.js";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

const Modal = ({open,handleOpen,handleClose,startValue,endValue}) => {
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
                contentStyle={{textAlign: "center"}}
                onRequestClose={handleClose}>
                You have earned <Xp startValue={startValue} endValue={endValue} /> XP today!
            </Dialog>
        </div>
    )
};

export default Modal;
