
import React from 'react'
import WebMidi from "webmidi";
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers/reducers.js';
import mySaga from './sagas/sagas.js';
import initialState from "./state.js";

import { generateKeys, setPlayer, pressKeySaga, releaseKeySaga, clearWrongPauseSaga } from "./actions/actions.js";
import App from './app.js';



// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

let ac = new AudioContext;
let store, input;

let persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : initialState;



WebMidi.enable(function (err) {
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
    input = WebMidi.inputs[0];
});

Soundfont.instrument(ac, 'acoustic_grand_piano')

        .then(piano => {
            
            store = createStore(reducers,persistedState,applyMiddleware(sagaMiddleware));
            sagaMiddleware.run(mySaga)
            store.dispatch(generateKeys(persistedState.gameState.size,persistedState.gameState.offset));
            store.dispatch(setPlayer(piano,ac));
            
            window.onkeyup = function (e) {
                if (store.getState().navigation.currentPage === "/interface"
                    && store.getState().gameState.wrongPause) {
                    store.dispatch(clearWrongPauseSaga());
                }
                
            };
            
            if (input) {
            
                input.addListener('noteon', "all",
                    function (e) {
                    console.log("Received 'noteon' message (" + e.note.number + ").");
                    if (store.getState().navigation.currentPage === "/interface" 
                        && !store.getState().gameState.modal
                        && !store.getState().gameState.wrongPause) {
                        store.dispatch(pressKeySaga(parseInt(e.note.number), 20, 150));
                        }
                    }
                );
                
                input.addListener('noteoff', "all",
                    function (e) {
                    console.log("Received 'noteoff' message (" + e.note.number + ").");
                    if (store.getState().navigation.currentPage === "/interface"
                        && !store.getState().gameState.modal
                        && !store.getState().gameState.wrongPause) {
                        store.dispatch(releaseKeySaga(parseInt(e.note.number)));
                        }
                    }
                );
            }
            
            store.subscribe(() => {
                console.log("saving state",store.getState());
                localStorage.setItem("reduxState", JSON.stringify(store.getState()));
            });
            
            render(
                
                  <Provider store={store}>
                    

                        <App />

                        
                  </Provider>
                ,
              document.getElementById('root')
            );
        });



