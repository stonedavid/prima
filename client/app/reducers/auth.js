import { SUBMIT_USER, SUBMISSION_ERROR, CLEAR_ERRORS } from "../actions/actions.js";

function auth(state = {}, action) {
    switch (action.type) {
        case SUBMIT_USER:
            console.log("SUBMITTING USER");
            console.log(action.form);
            return Object.assign({},state, {
                email: action.form.email,
                userName: action.form.userName,
                password: action.form.password,
                token: "12345",
                isAuthenticated: true
            });
            
        case SUBMISSION_ERROR:
            console.log("SUBMISSION ERROR");
            return Object.assign({}, state, {
                isAuthenticated: false,
                errors: action.errors
            });
            
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                errors: {}
            });
            
        default:
            return state;
    }
}

export default auth;