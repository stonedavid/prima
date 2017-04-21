import { connect } from 'react-redux';
import { evalNote, evalSaga, pressKey, releaseKey, advanceCard } from '../actions/actions.js';
import Keyboard from '../components/keyboardComponent.js';

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
                dispatch(evalSaga(midiValue))
            }
            
        },
        onRelease: (e,midiValue) => {
            e.preventDefault();
            if (e.buttons || (e.type == "mouseup")) {
                console.log("RELEASED MIDIVALUE", midiValue);
                dispatch(advanceCard(midiValue));
                dispatch(releaseKey(midiValue));
            }
        }
        
    }
}

const KeyboardContainer = connect(mapStateToProps,mapDispatchToProps)(Keyboard);

export default KeyboardContainer;