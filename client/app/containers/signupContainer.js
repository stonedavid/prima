import { connect } from 'react-redux';
import { submitUser, submissionError, changeUrl } from '../actions/actions.js';
import SignupForm from "../components/signupForm.js";

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
            
            const name = encodeURIComponent(state.userName);
            const email = encodeURIComponent(state.email);
            const password = encodeURIComponent(state.password);
            
            const formData = `name=${name}&email=${email}&password=${password}`;
            
            const xhr = new XMLHttpRequest();
            xhr.open("post","/auth/signup");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.responseType = "json";
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    dispatch(submissionError({}));
                    dispatch(changeUrl("/login"));
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
