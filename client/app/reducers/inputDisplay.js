// ok, these need to be more abstract somehow. the actual mapping takes place in the containers.
// these are merely slicing up the state...or not??? now I'm not sure
// the tutorial handles toggling and adding in REDUCERS
// but filtering takes place in the CONTAINER

import {
    GENERATE_KEYS,
    PRESS_KEY,
    RELEASE_KEY,
    CREATE_KEY,
    createKey,
    SET_PLAYER,
}

from "../actions/actions.js";



/*
 * Single Key object action reducer
 */

const key = (state = {}, action) => {

    switch (action.type) {
        case "PRESS_KEY": 
            if (state.midiValue != action.midiValue) {
                return state
            }
            
            let color = action.evaluation ? "green" : "red";
            
            return Object.assign({},state, {
                pressed: true,
                node: action.node,
                evaluation: action.evaluation
                
            });
            
        case "RELEASE_KEY":
            if (state.midiValue != action.midiValue) {
                return state
            }

            if (state.node) state.node.stop();
            return Object.assign({},state, {
                pressed: false,
                node: undefined,
                evaluation: false
            });
            
        case "CREATE_KEY":
            return {
                midiValue: action.midiValue,
                pressed: false
            }
        default:
            return state;
    }
};

/*
 * Keys array action reducer
 */

const keys = (state = [], action) => {
    switch (action.type) {
        
        case "PRESS_KEY":
            return state.map(k =>
                key(k,action)
            )
            
        case "RELEASE_KEY":
            return state.map(k =>
                key(k,action)
            )
            
        case "CREATE_KEY":
            return key(undefined,action);
            
        default:
            return state
    }
}

/*
 * Full Keyboard object action reducer
 */

function keyboard(state = {}, action) {
    switch (action.type) {

        case GENERATE_KEYS:
            let midiValueArray = [...Array(action.size).keys()].map(i => i + action.offset);
            let newKeys = midiValueArray.map(function(midiValue) {
                    return keys(undefined,createKey(midiValue))
                    });
            return Object.assign({},state, {
                size: action.size,
                offset: action.offset,
                keys: newKeys
            }); 
            
        case PRESS_KEY:
            return Object.assign({},state, {
                keys: keys(state.keys,action)
            })
            
        case RELEASE_KEY:
            return Object.assign({},state, {
                keys: keys(state.keys,action)
            })
            
        default:
            return state;
    }
}


function inputDisplay(state = {}, action) {
    switch (action.type) {
        case SET_PLAYER:
            return Object.assign({}, state, {
                audioPlayer: action.audioPlayer,
                audioContext: action.audioContext
            })
            
        case GENERATE_KEYS:
            return Object.assign({}, state, {
                keyboard: keyboard(state.keyboard, action)
            });
            
        case PRESS_KEY:
            let player = state.audioPlayer;
            let ac = state.audioContext;
            // create audio node and attach to the action to be passed to the key object
            action = Object.assign(
                {},action, {
                    node: player.play(action.midiValue, ac.currentTime, { release: 0.3 })
                });
                
        case RELEASE_KEY:
            return Object.assign({}, state, {
                keyboard: keyboard(state.keyboard, action)
            })

        default:
            return state;
    }
}

export default inputDisplay;