import { connect } from "react-redux";

import Dashboard from "../components/dashboardComponent.js";


const mapStateToProps = (state) => {
    return {
        lessons: state.gameState.userLessons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLessons: () => {
            console.log("DISPATCHING GET LESSONS");
            setTimeout(() => { dispatch({type: 'GET_USER_LESSONS'}); }, 1);
        }
    };
}

const DashboardContainer = connect(mapStateToProps,mapDispatchToProps)(Dashboard);

export default DashboardContainer;