import { combineReducers } from "redux";
import inputDisplay from "./inputDisplay.js";
import auth from "./auth.js";

export default combineReducers({
    inputDisplay,
    auth
    });
