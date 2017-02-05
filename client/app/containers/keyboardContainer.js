import { connect } from 'react-redux';
import { generateKeys, pressKey, releaseKey } from '../actions/actions.js';
import { Keyboard } from '../components/keyboardComponent.js';

const mapStateToProps = (state) => {
    return {
        keys: state.inputDisplay.keyboard.keys
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPress: (e,midiValue) => {
            e.preventDefault();
            if (e.buttons) {
                dispatch(pressKey(midiValue))
            }
            
        },
        onRelease: (e,midiValue) => {
            e.preventDefault();
            if (e.buttons || (e.type == "mouseup")) {
                dispatch(releaseKey(midiValue))
            }
        }
        
    }
}

const KeyboardContainer = connect(mapStateToProps,mapDispatchToProps)(Keyboard);

export default KeyboardContainer;