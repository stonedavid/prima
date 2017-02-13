
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers/reducers.js';
import initialState from "./state.js";
import { generateKeys, setPlayer } from "./actions/actions.js";
import App from './app.js';

console.log(initialState);

const AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

let ac = new AudioContext;
let store;

Soundfont.instrument(ac, 'acoustic_grand_piano')

        .then(piano => {
            
            store = createStore(reducers,initialState);
            store.dispatch(generateKeys(initialState.gameState.size,initialState.gameState.offset));
            store.dispatch(setPlayer(piano,ac));
            console.log(store.getState());
            render(
                
                  <Provider store={store}>
                    

                        <App />

                        
                  </Provider>
                ,
              document.getElementById('root')
            )
        });
            





if (module.hot) {
    module.hot.accept("./app", function() {
        var NextApp = require("./app.js");
        render(
            <Provider store={store}>
                <NextApp/>
            </Provider>,
            document.getElementById("root"));
    });
}