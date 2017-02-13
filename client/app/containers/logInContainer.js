import { connect } from 'react-redux';
import { submitUser, submissionError, changeUrl } from '../actions/actions.js';
import UserForm from "../components/userForm.js";

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
                    dispatch(submitUser(state));
                    dispatch(changeUrl("/interface"));
                } else {
                    const errors = xhr.response.errors ? xhr.response.errors : {};
                    errors.summary = xhr.response.message;
                    dispatch(submissionError(errors));
                    console.log(errors);
                }
                
            });
            
            xhr.send(formData);
        }
    };
};

const SignUpContainer = connect(mapStateToProps,mapDispatchToProps)(UserForm);

export default SignUpContainer;
