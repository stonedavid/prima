import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FloatingTile from "../containers/floatingTile.js";
import Paper from "material-ui/Paper";
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import Auth from "../src/modules/Auth.js";

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1000,
    height: "auto",
    overflowY: 'auto',
  },
};

import Display from "./displayComponent.js";
    
// ok component cannot be dumb -- should the state be in redux??? like, literally just the loading state???
// does any other component care about it??? NO

class Lessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  
  getUserCardsets = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/api/users?" + "user=David");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        });
      }
    });
    xhr.send();
  }
}

    
/*
const Lessons = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={350}
      style={styles.gridList}
    >
      <GridTile 
        cols={1}
        children={
          <FloatingTile
            initZ = {1}
            floatZ = {5}
            children = {
              <Display 
                noteString = {"C4/q,E3/8,Eb4/h,D2/16"}
                />
            }
          />
        }
      />
      <GridTile 
        cols={1}
        children={
          <FloatingTile
            initZ = {1}
            floatZ = {5}
            children = {
              <Display 
                noteString = {"C4/q,E4/8,Eb4/h,D4/16"}
                />
            }
          />
        }
      />
    </GridList>
  </div>
);
*/
export default Lessons;