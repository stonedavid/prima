import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import { Card, CardTitle, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Display from "./displayComponent";
import Xp from "./xpComponent.js";

import Sharp from "./sharpSvgComponent.js";

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
let currentDate = new Date();
let yesterday = new Date(Date.now() - (1000 * 3600 * 24)).toDateString();

     
const Home = () =>
  (
      <Card>
        <CardTitle title={yesterday} subtitle="Improve your sight-reading" />
        <Sharp viewBox={"0 0 1.1 3.0000001"} width="6.8493137"
   height="18.679947"
 />
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
        <h2>{currentDate.toDateString()}</h2>
      </Card>
    )
    
export default Home;