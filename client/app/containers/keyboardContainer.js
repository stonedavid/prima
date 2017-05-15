import { connect } from 'react-redux';
import { pressKeySaga, releaseKeySaga } from '../actions/actions.js';
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
                dispatch(pressKeySaga(midiValue,e.nativeEvent.offsetX,e.nativeEvent.offsetY));
            }
            
        },
        onRelease: (e,midiValue,pressed) => {
            e.preventDefault();
            if (pressed && (e.buttons || (e.type == "mouseup"))) {
                console.log("RELEASING", midiValue)
                dispatch(releaseKeySaga(midiValue));
            }
        }
        
    }
}

const KeyboardContainer = connect(mapStateToProps,mapDispatchToProps)(Keyboard);

export default KeyboardContainer;