import { connect } from 'react-redux';
import { login, submitUser, submissionError, changeUrl, clearErrors } from '../actions/actions.js';
import LoginForm from "../components/loginForm.js";


const mapStateToProps = (state) => {
    return {
        errors: state.auth.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (form,user) => {
            form.preventDefault();
            dispatch(login(user)); // login is an action that refers to a SAGA
        },
        
        changeUrl: (url) => {
            dispatch(changeUrl(url));
        }
    };
};

const LoginContainer = connect(mapStateToProps,mapDispatchToProps)(LoginForm);

export default LoginContainer;
