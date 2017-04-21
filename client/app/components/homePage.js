import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import   MuiThemeProvider  from "material-ui/styles/MuiThemeProvider";
import { Card, CardTitle, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Display from "./displayComponent";

const genRandomNoteString = (length) => {
  var string = "";
  var notes = ["A","B","C","D","E","F","G"];
  var rhythms = ["q","h"];
  var octaves = ["4","5"];
  for (var i = 0; i<length; i++) {
    string+= notes[Math.floor(Math.random() * 7)] + octaves[Math.floor(Math.random() * octaves.length)] + "/" + rhythms[Math.floor(Math.random() * rhythms.length)] + ",";
  }
  
  return string.substring(0, string.length - 1);
};

let noteString = genRandomNoteString(3);

console.log(noteString);

const Home = () =>
  (
    <MuiThemeProvider>
      <Card>
        <CardTitle title="Welcome to Prima!" subtitle="Improve your sight-reading" />
        <Display
          noteString={noteString}
          active={true}
        />
        <CardActions style={{ margin: "0px" }}>
            <FlatButton 
              label="Get Started" 
              onClick={() => browserHistory.push("/signup")}
              style={{
                marginRight: "0"
              }}
              />
        </CardActions>
      </Card>
    </MuiThemeProvider>
    )
    
export default Home;