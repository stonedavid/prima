import { connect } from 'react-redux';
import { login, submissionError, changeUrl } from '../actions/actions.js';
import SignupForm from "../components/signupForm.js";

const mapStateToProps = (state) => {
    return {
        errors: state.auth.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (form,user) => {
            form.preventDefault();
            
            //AJAX request here:
            
            const name = encodeURIComponent(user.userName);
            const email = encodeURIComponent(user.email);
            const password = encodeURIComponent(user.password);
            const confirmPassword = encodeURIComponent(user.confirmPassword);
            
            const formData = `name=${name}&email=${email}&password=${password}&confirmPassword=${confirmPassword}`;
            
            const xhr = new XMLHttpRequest();
            xhr.open("post","/auth/signup");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.responseType = "json";
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    dispatch(submissionError({}));
                    dispatch(login(user));
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

const SignupContainer = connect(mapStateToProps,mapDispatchToProps)(SignupForm);

export default SignupContainer;
