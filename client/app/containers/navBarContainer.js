import { connect } from 'react-redux';
import { changeUrl } from "../actions/actions.js";
import NavBar from "../components/navBarComponent.js";

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event) => {
            console.log(event.toString());
            dispatch(changeUrl(event.toString()));
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