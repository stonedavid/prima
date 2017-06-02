import React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

const WrongPauseModal = ({open,handleOpen,handleClose}) => {
    const actions = [
            <RaisedButton
                label="Press any key to continue"
                onTouchTap={handleClose}
                fullWidth={true}
              />
            ];
    
    return (
        <div>
            <Dialog
                modal={true}
                open={open}
                contentStyle={{textAlign: "center",width: 300}}
                bodyStyle={{padding: 0}}
                onRequestClose={handleClose}
                actions={actions}
                overlayStyle={{opacity: 0}}>
            </Dialog>
        </div>
    )
};

export default WrongPauseModal;
