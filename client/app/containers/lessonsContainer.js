import { connect } from "react-redux";

import LessonsComponent from "../components/lessonsComponent.js";

const mapStateToProps = (state) => {
    return {
        lessons: state.gameState.userLessons,
        email: state.gameState.player.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLessons: () => {
            console.log("DISPATCHING GET LESSONS");
            setTimeout(() => { dispatch({type: 'GET_USER_LESSONS'}); }, 1);
        }
    };
};

const LessonsContainer = connect(mapStateToProps,mapDispatchToProps)(LessonsComponent);

export default LessonsContainer;