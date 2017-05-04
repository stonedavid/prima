import { connect } from "react-redux";

import ModalComponent from "../components/modalComponent.js";

import { setModalState, changeUrl, updateTotalXp } from "../actions/actions.js";

const mapStateToProps = (state) => {
    return {
        open: state.gameState.modal,
        startValue: state.gameState.player.totalXp,
        endValue: state.gameState.player.totalXp + state.gameState.gameValue
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOpen: () => {
            dispatch(setModalState(true));
        },
        
        handleClose: () => {
            dispatch(updateTotalXp());
            dispatch(setModalState(false))
            dispatch(changeUrl("/lessons"));
        }
    };
};

const Modal = connect(mapStateToProps,mapDispatchToProps)(ModalComponent);

export default Modal;

