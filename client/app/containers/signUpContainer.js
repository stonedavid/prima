import { connect } from 'react-redux';
import { submitUser } from '../actions/actions.js';
import { browserHistory } from "react-router";
import SignUpComponent from "../components/signUpComponent.js";

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (form,state) => {
            form.preventDefault();
            
            //AJAX request here:
            dispatch(submitUser(state));
            browserHistory.push("/interface");
        }
    }
}

const SignUpContainer = connect(null,mapDispatchToProps)(SignUpComponent);

export default SignUpContainer
