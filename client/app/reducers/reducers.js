import { combineReducers } from "redux";
import navigation from "./navigation.js";
import inputDisplay from "./inputDisplay.js";
import auth from "./auth.js";
import gameState from "./gameState.js";

export default combineReducers({
    navigation,
    inputDisplay,
    auth,
    gameState
    });
