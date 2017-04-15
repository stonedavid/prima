import React, { Component, PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { connect } from "react-redux"

import Slider from "material-ui/Slider";
import Card from "material-ui/Card";

import { pressKey, releaseKey, evalSaga } from '../actions/actions.js';
import Keyboard from '../containers/keyboardContainer.js';
import Display from "../components/displayComponent.js";
import ProgressBar from "../components/progressBarComponent.js";

const mapStateToProps = (state) => {
    return {
        noteString: state.gameState.currentCard.noteString,
        currentScore: state.gameState.currentScore
    };
};

const containerStyle = {
    position: "relative",
    display: "block",
    height: 210,
    paddingTop: 20,
    paddingBottom: 20
}

const progressContainerStyle = {
    position: "relative",
    display: "block",
    height: 30,
    paddingTop: 20,
    margin: "auto",
    width: 604
}

const childStyle = {
    position: "absolute",
    display: "inline",
    right: 0,
    left: 0
}

const Interface = ({ noteString, currentScore, currentMIDI }) => {
    const displayChild =  <Display noteString = {noteString} active = {true} key = {Math.random()}/>;

    return (
    <div>
      
        <Card>
            <div style={containerStyle}>
                <CSSTransitionGroup
                    transitionName="slide"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div key={Math.random()} style={childStyle}>
                        {displayChild}
                    </div>
                </CSSTransitionGroup>
            </div>
            <div style={progressContainerStyle}>
                <ProgressBar progress={(currentScore/20) * 100}  />
            </div>
            <Keyboard />
        </Card>
    </div>
  )
}

const InterfaceContainer = connect(mapStateToProps)(Interface);

export default InterfaceContainer;