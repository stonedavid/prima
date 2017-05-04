import { SUBMIT_USER, SUBMISSION_ERROR, CLEAR_ERRORS, LOGOUT } from "../actions/actions.js";

import cleanState from "../state.js";

function auth(state = {}, action) {
    switch (action.type) {
        case SUBMIT_USER:
            console.log("SUBMITTING USER");
            console.log(action.form);
            return Object.assign({},state, {
                email: action.form.email,
                name: action.form.name,
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
            
        case LOGOUT:
            return Object.assign({}, state, cleanState.auth);
            
        default:
            return state;
    }
}

export default auth;