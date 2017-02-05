import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"

import { generateKeys, pressKey, releaseKey } from '../actions/actions.js';
import Keyboard from '../components/keyboardComponent.js';
import Display from "../components/displayComponent.js";

const mapStateToProps = (state) => {
    return {
        keys: state.inputDisplay.keyboard.keys,
        displayNote: state.inputDisplay.queryNote
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

const Interface = ({ displayNote, keys, onPress, onRelease }) => {
    return (
    <div>
      <Display displayNote={displayNote}  />
      <Keyboard keys={keys} onPress={onPress} onRelease={onRelease} />
    </div>
  )
}

const InterfaceContainer = connect(mapStateToProps,mapDispatchToProps)(Interface);

export default InterfaceContainer;