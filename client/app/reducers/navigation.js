import { CHANGE_URL, LOGOUT } from "../actions/actions.js";
import { browserHistory } from "react-router";
import cleanState from "../state.js";

function navigation(state = {}, action) {
    switch (action.type) {
        case CHANGE_URL:
            console.log(action);
            browserHistory.push(action.url);
            return Object.assign({}, state, {
                currentPage: action.url
            });
            
        case LOGOUT:
            return Object.assign({}, state, cleanState.navigation);
            
        default:
            return state;
    }
}

export default navigation;