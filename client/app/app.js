//Q: what is the exact role here -- three things happening? 
// keyboard css imported, routes imported, tap injected
// these things seem a little unrelated
// i think keyboard styles should be applied inline

import React from "react";

import { Router, browserHistory } from 'react-router';
import routes from "./routes.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// css
import "../css/keyboard.css";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
)

export default App;
