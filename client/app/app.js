//import Bootstrap from './client/css/bootstrap.min.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";


import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//var Soundfont = require("soundfont-player");
var player;

import NavBar from "./components/navBarComponent.js";
import Home from "./components/homePage.js";

import Interface from "./containers/interfaceContainer.js";
import AuthContainer from "./containers/authContainer.js";
import SignupContainer from "./containers/signUpContainer.js";




// css
import "../css/keyboard.css";
//import "../css/bootstrap.min.css";

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class ProgressBar extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    var outerStyle = {
      margin: "auto",
      width: "80%"
    };
    var innerStyle = {
      backgroundColor: "springgreen",
      width: this.props.progress.toString() + "%",
      height: "inherit",
      transition: "width 0.5s ease"
    };
    return <div className="progress" style={outerStyle}>
        <div className="progress-bar progressbar-success" role="progressbar" aria-valuenow={this.props.progress}
          aria-valuemin="0" aria-valuemax="100" style={innerStyle}>
        </div>
      </div>;
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    console.log("constructing app")
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Container}>
          <IndexRoute component={Home}></IndexRoute>
          <Route path="/interface" component={AuthContainer(Interface)}></Route>
          <Route path="/signup" component={SignupContainer}></Route>
        </Route>
      </Router>
    )
  }
}

const Container = (props) => (
  <div>
    <NavBar />
    {props.children}
  </div>
  );

export default App;
