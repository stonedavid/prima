//Q: what is the exact role here -- three things happening? 
// keyboard css imported, routes imported, tap injected
// these things seem a little unrelated
// i think keyboard styles should be applied inline

import React from "react";

import { Router, browserHistory } from 'react-router';
import routes from "./src/routes.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from "material-ui/styles/getMuiTheme";

// css
import "../css/keyboard.css";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: "Raleway, sans-serif"
  });

console.log("theme",muiTheme);

const App = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
)

export default App;
