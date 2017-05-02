import { connect } from "react-redux";

import ModalComponent from "../components/modalComponent.js";

import { setModalState } from "../actions/actions.js";

const mapStateToProps = (state) => {
    return {
        open: state.gameState.modal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOpen: () => {
            dispatch(setModalState(true));
        },
        
        handleClose: () => {
            dispatch(setModalState(false));
        }
    };
};

const Modal = connect(mapStateToProps,mapDispatchToProps)(ModalComponent);

export default Modal;

