import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import   MuiThemeProvider  from "material-ui/styles/MuiThemeProvider";
import { Card, CardTitle, CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Display from "./displayComponent.js";

const Home = () =>
  (
    <MuiThemeProvider>
      <Card>
        <CardTitle title="Welcome to Prima!" subtitle="Improve your sight-reading" />
        <Display
          noteString={"C4/8"}
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