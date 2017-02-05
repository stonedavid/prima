import { SUBMIT_USER, submitUser } from "../actions/actions.js";

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
            
        default:
            return state;
    }
}

export default auth;