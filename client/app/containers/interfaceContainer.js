import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"

import Slider from "material-ui/Slider";
import Card from "material-ui/Card";

import { pressKey, releaseKey, evalNote } from '../actions/actions.js';
import Keyboard from '../components/keyboardComponent.js';
import Display from "../components/displayComponent.js";

const mapStateToProps = (state) => {
    return {
        keys: state.inputDisplay.keyboard.keys,
        noteString: state.gameState.currentCard.noteString,
        currentScore: state.gameState.currentScore
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPress: (e,midiValue) => {
            e.preventDefault();
            if (e.buttons || e.type === "touchstart") {
                dispatch(evalNote(midiValue));
                dispatch(pressKey(midiValue))
            }
            
        },
        onRelease: (e,midiValue) => {
            e.preventDefault();
            if (e.buttons || (e.type == "mouseup") || (e.type === "touchend")) {
                dispatch(releaseKey(midiValue))
            }
        }
        
    }
}

const progressStyle = {
    display: "block",
    margin: "auto",
    width: "600px"
}

const Interface = ({ noteString, keys, onPress, onRelease, currentScore }) => {
    return (
    <div>
      
        <Card>
            <Display noteString= {noteString} />
            <progress value={currentScore} max="20" style={progressStyle}></progress>

            <Keyboard keys={keys} onPress={onPress} onRelease={onRelease} />
        </Card>
    </div>
  )
}

const InterfaceContainer = connect(mapStateToProps,mapDispatchToProps)(Interface);

export default InterfaceContainer;