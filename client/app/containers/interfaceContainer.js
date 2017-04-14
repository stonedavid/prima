import React, { Component, PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { connect } from "react-redux"

import Slider from "material-ui/Slider";
import Card from "material-ui/Card";

import { pressKey, releaseKey, evalSaga } from '../actions/actions.js';
import Keyboard from '../components/keyboardComponent.js';
import Display from "../components/displayComponent.js";
import ProgressBar from "../components/progressBarComponent.js";

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
                
                // this saga will check the score against the threshold, and then async call a gamestate update followed by API call if necessary
                dispatch(evalSaga(midiValue)); 
                dispatch(pressKey(midiValue));
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

const Interface = ({ noteString, keys, onPress, onRelease, currentScore, currentMIDI }) => {
    const child = <div key={Math.random()}><Display noteString = {noteString} active = {1}/></div>;
    return (
    <div>
      
        <Card>
            <div style={{height: 208, position: "relative", overflow: "hidden", margin: "auto"}}>
            <CSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={600}
                transitionLeave={false}>
                {child}
            </CSSTransitionGroup>
            </div>
            <ProgressBar progress={currentScore} />
            <Keyboard keys={keys} onPress={onPress} onRelease={onRelease} />
        </Card>
    </div>
  )
}

const InterfaceContainer = connect(mapStateToProps,mapDispatchToProps)(Interface);

export default InterfaceContainer;