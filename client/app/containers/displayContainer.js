import { connect } from 'react-redux';
import { Display } from '../components/displayComponent.js';

 /*
  * Container maps state.queryNote to props.displayNote in the DisplayComponent
  */

const mapStateToProps = (state) => {
    return {
        displayNote: state.inputDisplay.queryNote
    };
}

const DisplayContainer = connect(mapStateToProps)(Display);

export default DisplayContainer;