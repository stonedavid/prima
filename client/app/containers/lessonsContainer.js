import { connect } from "react-redux";

import LessonsComponent from "../components/lessonsComponent.js";

const mapStateToProps = (state) => {
    return {
        email: state.gameState.player.email,
        totalXp: state.gameState.player.totalXp
    };
};

const LessonsContainer = connect(mapStateToProps)(LessonsComponent);

export default LessonsContainer;