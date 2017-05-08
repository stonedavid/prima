import { connect } from "react-redux";

import ProgressReport from "../components/progressReportComponent.js";

const mapStateToProps = (state) => {
    return {
        totalXp: state.gameState.player.totalXp,
        xpHistory: state.gameState.player.xpHistory,
        details: state.gameState.lessonDetails
    };
};

const ProgressReportContainer = connect(mapStateToProps)(ProgressReport);

export default ProgressReportContainer;