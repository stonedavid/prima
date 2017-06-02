import { connect } from "react-redux";

import ModalComponent from "../components/modalComponent.js";

import { setModalState, changeUrl } from "../actions/actions.js";

const mapStateToProps = (state) => {
    return {
        open: state.gameState.modal,
        startValue: state.gameState.modalXpDisplay.start,
        endValue: state.gameState.modalXpDisplay.end
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOpen: () => {
            dispatch(setModalState(true));
        },
        
        handleClose: () => {
            dispatch(setModalState(false))
            dispatch(changeUrl("/lessons"));
        }
    };
};

const Modal = connect(mapStateToProps,mapDispatchToProps)(ModalComponent);

export default Modal;

