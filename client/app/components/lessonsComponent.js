import React, {
  Component
}
from 'react';
import {
  GridList,
  GridTile
}
from 'material-ui/GridList';
import FloatingTile from "../containers/floatingTileContainer.js";
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
    marginTop: 30,
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
};

import Display from "./displayComponent.js";

// ok component cannot be dumb -- should the state be in redux??? like, literally just the loading state???
// does any other component care about it??? NO

class Lessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lessons: null
    };
  }

  //TODO: connect this with mapStateToProps so that the user name is part of the props

  getUserLessons = () => {
    //TODO for lessons this should only retrieve the lessons component of the user
    
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/api/getLessons/" + "David Stone");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        console.log("response", xhr.response);
        this.setState({
          loading: false,
          lessons: xhr.response.lessons
        });
      }
    });
    xhr.send();
  }
  
  cardsetToNoteString = (lessonMeta) => {
    
    let name = lessonMeta.name;
    let range = new RegExp('(\\w+)\-(\\w+)','g');
    let accidentals = name.split(".")[1];
    let durations = name.split(".")[2];
    let match = range.exec(name);
    let noteString = `${match[1]}/${durations},${match[2]}/${durations}`
    return noteString
    
  }
  
  componentDidMount() {
    this.getUserLessons();
  }

  render() {
    return (
      this.state.loading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={styles.root}>
          <GridList
            cellHeight={"auto"}
            padding={10}
            cols={1}
            style={styles.gridList}
          >
            {this.state.lessons.map( lessonMeta => {
            
              return (
                <GridTile 
                  cols={1}
                  children={
                    <FloatingTile
                      initZ = {1}
                      floatZ = {3}
                      lessonMeta = { lessonMeta }
                      children = {
                        <Display
                          noteString = {this.cardsetToNoteString(lessonMeta)}
                          line = {true}
                        />
                      }
                    />
                  }
                />
              )
            })
            }
      </GridList>
    </div>
      )
    );
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
