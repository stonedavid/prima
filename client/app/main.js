
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers/reducers.js';
import mySaga from './sagas/sagas.js';
import initialState from "./state.js";

import { generateKeys, setPlayer } from "./actions/actions.js";
import App from './app.js';



// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

let ac = new AudioContext;
let store;

const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : initialState;

Soundfont.instrument(ac, 'acoustic_grand_piano')

        .then(piano => {
            
            store = createStore(reducers,persistedState,applyMiddleware(sagaMiddleware));
            sagaMiddleware.run(mySaga)
            store.dispatch(generateKeys(persistedState.gameState.size,persistedState.gameState.offset));
            store.dispatch(setPlayer(piano,ac));
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



