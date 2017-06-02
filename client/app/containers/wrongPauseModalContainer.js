import { connect } from "react-redux";

import WrongPauseModalComponent from "../components/wrongPauseModalComponent.js";

import { setWrongPause } from "../actions/actions.js";

const mapStateToProps = (state) => {
    return {
        open: !!state.gameState.wrongPause,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOpen: () => {
            
        },
        
        handleClose: () => {
            dispatch({ type: "CLEAR_WRONG_PAUSE_SAGA"});
        }
    };
};

const WrongPauseModal = connect(mapStateToProps,mapDispatchToProps)(WrongPauseModalComponent);

export default WrongPauseModal;

