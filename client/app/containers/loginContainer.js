import { connect } from 'react-redux';
import { submitUser, submissionError, changeUrl } from '../actions/actions.js';
import LoginForm from "../components/loginForm.js";
import Auth from "../src/modules/Auth";

const mapStateToProps = (state) => {
    return {
        errors: state.auth.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (form,state) => {
            form.preventDefault();
            
            //AJAX request here:
            
            const email = encodeURIComponent(state.email);
            const password = encodeURIComponent(state.password);
            
            const formData = `email=${email}&password=${password}`;
            
            const xhr = new XMLHttpRequest();
            xhr.open("post","/auth/login");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.responseType = "json";
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    Auth.authenticateUser(xhr.response.token);
                    dispatch(submitUser(state)); // checking this reducer...apparently right now it just adds user to the state
                    dispatch(submissionError({}));
                    dispatch(changeUrl("/"));
                } else {
                    const errors = xhr.response.errors ? xhr.response.errors : {};
                    errors.summary = xhr.response.message;
                    dispatch(submissionError(errors));
                    console.log(errors);
                }
                
            });
            
            xhr.send(formData);
        },
        
        changeUrl: (url) => {
            dispatch(changeUrl(url));
        }
    };
};

const LoginContainer = connect(mapStateToProps,mapDispatchToProps)(LoginForm);

export default LoginContainer;
