import {
    put,
    call,
    takeEvery,
    takeLatest,
    select
}
from 'redux-saga/effects'
import {
    delay
}
from 'redux-saga'

const API = require("../src/API.js");

import {
    submitUser,
    changeUrl,
    submissionError,
    clearErrors,
    setGameUser,
    saveError,
    evalNote,
    mountUserLessons,
    updateMeta,
    pressKey,
    hintKey,
    releaseKey,
    advanceCard,
    setModalState,
    setModalXpDisplay,
    setWrongPause,
    updateXp,
    GET_USER_LESSONS
}
from "../actions/actions.js";

import Auth from "../src/modules/Auth";

export function* loginSaga(action) {
    /*
     * type: LOGIN, user: { username, email, password }
     */

    try {
        const response = yield call(API.login, action.user);
        Auth.authenticateUser(response.token);
        console.log("LOGIN API RESPONSE", response);
        yield put(submitUser(response.user));
        yield put(setGameUser(response.user));
        yield put(clearErrors());
        yield put(changeUrl("/lessons"));
    }
    catch (e) {
        const errors = e.errors ? e.errors : {};
        errors.summary = e.message;
        yield put(submissionError(errors));
    }
}

/**
 * pressKeySaga
 * @param action = { score, threshold }
 * 
 * Triggers saveCards if score lesson completed
 **/

export function* pressKeySaga(action) {
    const currentCard = yield select(state => state.gameState.currentCard);
    const correctMIDI = currentCard.midiValue;
    const difficulty = currentCard.difficulty;
    const evaluation = correctMIDI == action.midiValue;
    if (!evaluation && (difficulty > .66)) {
        yield put(pressKey(action.midiValue, evaluation, action.xOffset, action.yOffset));
        yield put(hintKey(correctMIDI, action.xOffset, action.yOffset));
        yield put(setWrongPause(action.midiValue, correctMIDI));
    } else {
        yield put(pressKey(action.midiValue, evaluation, action.xOffset, action.yOffset));
    }
    
}

export function* releaseKeySaga(action) {
    const correctMIDI = yield select(state => state.gameState.currentCard.midiValue);
    const wrongPause = yield select(state => state.gameState.wrongPause);
    const evaluation = correctMIDI == action.midiValue;
    
    yield put(releaseKey(action.midiValue));
    if (!wrongPause) {
        yield put(evalNote(action.midiValue));
        yield put(advanceCard());
    }
    yield call(pollScoreAndSave);
    
}

export function* clearWrongPauseSaga() {
    const right = yield select(state => state.gameState.wrongPause.right);
    const wrong = yield select(state => state.gameState.wrongPause.wrong);
    yield put(evalNote(wrong));
    yield put(setWrongPause(false));
    yield put(releaseKey(right));
    yield put(releaseKey(wrong));
    yield put(advanceCard());
}


export function* pollScoreAndSave() {
    const score = yield select(state => state.gameState.currentScore);
    const currentDayXp = yield select(state => state.gameState.player.xpHistory[new Date().toDateString()] || 0);
    const gameValue = yield select(state => state.gameState.gameValue);
    if (score === gameValue) {
        yield put(setModalXpDisplay(currentDayXp, currentDayXp + gameValue));
        yield put(setModalState(true));
        yield put({ type: "SAVE_CARDS" });
    }
}

/**
 * saveCards
 * @param action, with USER and CARDSET fields
 * */
 
export function* saveCards() {
    try {
        yield put(updateMeta());
        const user = yield select(state => state.gameState.player.email);
        const cardset = yield select(state => state.gameState.cardset);
        const lessonMeta = yield select(state => state.gameState.lessonMeta);
        const date = new Date().toDateString();
        const form = { user: user, cardset: cardset, lessonMeta: lessonMeta, lessonXp: 10, date: date };
        const response = yield call(API.saveCards,form);
        console.log("SAVE RESPONSE", response);
        yield put(updateXp(response.totalXp,response.xpHistory));
        
    }
    catch (e) {
        const errors = e.errors ? e.errors : {};
        errors.summary = e.message;
        yield put(saveError(errors));
    }
}

/**
 * getUserLessons
 * @param action 
 * @yields gets user lessons from API
 **/
 
export function* getUserLessons() {
    console.log("GET LESSONS SAGA");
    try {
        console.log("FETCHING LESSONS");
        const email = yield select(state => state.auth.email);
        const response = yield call(API.getUserLessons, email);
        yield put(mountUserLessons(response));
    } catch (e) {
        const errors = e.errors ? e.errors : {};
        errors.summary = e.message;
        console.log(errors);
    }
}

export default function* rootSaga() {
    yield takeEvery("LOGIN", loginSaga);
    yield takeEvery("SAVE_CARDS", saveCards);
    yield takeEvery("PRESS_KEY_SAGA", pressKeySaga);
    yield takeEvery("RELEASE_KEY_SAGA", releaseKeySaga);
    yield takeEvery("GET_USER_LESSONS", getUserLessons);
    yield takeEvery("CLEAR_WRONG_PAUSE_SAGA", clearWrongPauseSaga)
}
