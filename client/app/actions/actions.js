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
export const EVAL_INPUT_NOTE = "EVAL_INPUT_NOTE";

/*
 * validation actions
 */
 
export const SUBMIT_USER = "SUBMIT_USER";
export const IS_LOGGED_IN = "IS_LOGGED_IN";



/*
 * action creators
 */

export function generateKeys(size,offset) {
    return { type: GENERATE_KEYS, size: size, offset: offset };
}

export function createKey(midiValue) {
    return { type: CREATE_KEY, midiValue: midiValue };
}
 
export function pressKey(midiValue,node = {}) {
    return { type: PRESS_KEY, midiValue: midiValue };
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

export function evalInputNote(midiValue) {
    return { type: EVAL_INPUT_NOTE, midiValue };
}

export function submitUser(form) {
    return { type: SUBMIT_USER, form };
}