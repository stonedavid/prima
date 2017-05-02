import { connect } from 'react-redux';
import { changeUrl, logout } from "../actions/actions.js";
import NavBar from "../components/navBarComponent.js";

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event) => {
            console.log(event.toString());
            dispatch(changeUrl(event.toString()));
            if (event.toString() == "/logout") {
                console.log("LOGGING OUT...");
                dispatch(logout());
            }
        }
    };
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.navigation.currentPage,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);