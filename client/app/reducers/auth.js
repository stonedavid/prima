import { SUBMIT_USER, SUBMISSION_ERROR } from "../actions/actions.js";

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
            })
            
        default:
            return state;
    }
}

export default auth;