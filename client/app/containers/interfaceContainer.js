import React, { Component, PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { connect } from "react-redux"

import Slider from "material-ui/Slider";
import Card from "material-ui/Card";

import { pressKey, releaseKey, evalSaga } from '../actions/actions.js';
import Keyboard from '../containers/keyboardContainer.js';
import Display from "../components/displayComponent.js";
import ProgressBar from "../components/progressBarComponent.js";
import Modal from "../containers/modalContainer.js";

const mapStateToProps = (state) => {
    return {
        noteString: state.gameState.currentCard.noteString,
        currentScore: state.gameState.currentScore,
        modal: state.inputDisplay.modal
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
    width: 604,
    maxWidth: "90%"
}

const childStyle = {
    position: "absolute",
    display: "inline",
    right: 0,
    left: 0
}

const childStyleBox = {
    position: "absolute",
    display: "inline",
    right: 0,
    left: 0
}

const cardStyle = {
    background: "-moz-linear-gradient(top, rgba(244,244,244,1) 0%, rgba(255,255,255,0.74) 26%, rgba(255,255,255,1) 100%)", /* FF3.6-15 */
    background: "-webkit-linear-gradient(top, rgba(244,244,244,1) 0%,rgba(255,255,255,0.74) 26%,rgba(255,255,255,1) 100%)", /* Chrome10-25,Safari5.1-6 */
    background: "linear-gradient(to bottom, rgba(244,244,244,1) 0%,rgba(255,255,255,0.74) 26%,rgba(255,255,255,1) 100%)", /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    margin: 20
}



const boxStyle = {
    
    position: "absolute",
    height: 220,
    width: 180,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    background: "linear-gradient(70deg, #DDD -4%, transparent 61%),linear-gradient(#FFF,#DDD)",
    zIndex: 998,
    boxShadow: "0px 10px 60px #333",
    borderRadius: "20px",
    border: "5px solid #c9c9c9"
}

const Interface = ({ noteString, currentScore, currentMIDI, modal }) => {
    const displayChild =  <Display noteString = {noteString} active = {true} zDepth={5} />;
    return (
    <div>
      
        <Card style={cardStyle}>
            <div style={containerStyle}>
                <CSSTransitionGroup
                    transitionName="slide"
                    transitionEnterTimeout={450}
                    transitionLeaveTimeout={150}
                >
                    <div key={noteString} style={childStyleBox}>
                        {displayChild}
                    </div>
                </CSSTransitionGroup>
            </div>
            <div style={progressContainerStyle}>
                <ProgressBar progress={(currentScore/20) * 100}  />
            </div>
            <Keyboard />
        </Card>
        <Modal/>
    </div>
  )
}

const InterfaceContainer = connect(mapStateToProps)(Interface);

export default InterfaceContainer;