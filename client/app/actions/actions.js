/*
 * interface actions
 */

export const GENERATE_KEYS = "GENERATE_KEYS";
export const CREATE_KEY = "CREATE_KEY";
export const PRESS_KEY = "PRESS_KEY";
export const RELEASE_KEY = "RELEASE_KEY";
export const PLAY_MIDI = "PLAY_MIDI";
export const SET_PLAYER = "SET_PLAYER";
export const DISPLAY_NOTE = "DISPLAY_NOTE";

/*
 * validation actions
 */
 
export const LOGIN = "LOGIN"; 
export const SUBMIT_USER = "SUBMIT_USER";
export const SUBMISSION_ERROR ="SUBMISSION_ERROR";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const IS_LOGGED_IN = "IS_LOGGED_IN";

/*
 * API actions
 */

export const GET_USER_LESSONS = "GET_USER_LESSONS";
export const MOUNT_USER_LESSONS = "MOUNT_USER_LESSONS";
export const MOUNT_CARDS = "MOUNT_CARDS";
export const UPDATE_META = "UPDATE_META";
export const SAVE_CARDS = "SAVE_CARDS";
export const SAVE_ERROR = "SAVE_ERROR";

/*
 * navigation actions
 */

export const CHANGE_URL = "CHANGE_URL";

/*
 * game actions
 */

export const EVAL_NOTE = "EVAL_NOTE";
export const EVAL_SAGA = "EVAL_SAGA";
export const SET_GAME_USER = "SET_GAME_USER";
export const SET_CLOCK = "SET_CLOCK";

/*
 * action creators
 */

export function generateKeys(size,offset) {
    return { type: GENERATE_KEYS, size: size, offset: offset };
}

export function createKey(midiValue) {
    return { type: CREATE_KEY, midiValue: midiValue };
}
 
export function pressKey(midiValue,evaluation) {
    return { type: PRESS_KEY, midiValue: midiValue, evaluation: evaluation };
}

export function releaseKey(midiValue) {
    return { type: RELEASE_KEY, midiValue: midiValue };
}

export function playMidi(midiValue) {
    return { type: PLAY_MIDI, midiValue };
}

export function setPlayer(audioPlayer, audioContext) {
    return { type: SET_PLAYER, audioPlayer: audioPlayer, audioContext: audioContext };
}

export function displayNote(noteObject) {
    return { type: DISPLAY_NOTE, noteObject };
}

export function getUserLessons() {
    return { type: GET_USER_LESSONS };
}

export function mountUserLessons(userLessons) {
    return { type: MOUNT_USER_LESSONS, userLessons };
}

export function mountCards(cardset, lessonMeta) {
    return { type: MOUNT_CARDS, cardset, lessonMeta };
}

export function updateMeta() {
    return { type: UPDATE_META };
}

export function saveCards() {
    return { type: SAVE_CARDS };
}

export function saveError(errors) {
    return { type: SAVE_ERROR, errors };
}

export function login(user) {
    return { type: LOGIN, user: user };
}

export function submitUser(form) {
    return { type: SUBMIT_USER, form };
}

export function submissionError(errors) {
    return { type: SUBMISSION_ERROR, errors };
}

export function clearErrors() {
    return { type: CLEAR_ERRORS }
}

export function changeUrl(url) {
    return { type: CHANGE_URL, url };
}

export function evalNote(midiValue) {
    return { type: EVAL_NOTE, midiValue };
}

export function evalSaga(midiValue) {
    return { type: EVAL_SAGA, midiValue };
}

export function setGameUser(form) {
    return { type: SET_GAME_USER, form };
}

export function setClock() {
    return { type: SET_CLOCK };
}