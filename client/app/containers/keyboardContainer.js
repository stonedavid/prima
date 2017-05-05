import { connect } from 'react-redux';
import { pressKeySaga, releaseKeySaga, advanceCard } from '../actions/actions.js';
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
        onRelease: (e,midiValue) => {
            e.preventDefault();
            if (e.buttons || (e.type == "mouseup")) {
                dispatch(releaseKeySaga(midiValue));
                dispatch(advanceCard());
            }
        }
        
    }
}

const KeyboardContainer = connect(mapStateToProps,mapDispatchToProps)(Keyboard);

export default KeyboardContainer;