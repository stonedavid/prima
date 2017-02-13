import { CHANGE_URL } from "../actions/actions.js";
import { browserHistory } from "react-router";

function navigation(state = {}, action) {
    switch (action.type) {
        case CHANGE_URL:
            browserHistory.push(action.url);
            return Object.assign({}, state, {
                currentPage: action.url
            });
            
        default:
            return state;
    }
}

export default navigation;