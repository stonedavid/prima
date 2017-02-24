import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import   MuiThemeProvider  from "material-ui/styles/MuiThemeProvider";
import { Card, CardTitle, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Animation from "./Animation.js";
import Display from "./displayComponent";

const Home = () =>
  (
    <MuiThemeProvider>
      <Card>
        <CardTitle title="Welcome to Prima!" subtitle="Improve your sight-reading" />
        <Animation
          noteString={"C4/8,D4/8,E4/8,F4/8,G4/8,A4/8,B4/8,C5/8"}
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