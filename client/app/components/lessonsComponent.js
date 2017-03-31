import React, {
  Component,
  PropTypes
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
    console.log("LESSONS PROPS",this.props);
  }

  cardsetToNoteString = (lessonMeta) => {
    
    let name = lessonMeta.name.split("_");
    let range = name[0].split("-");
    let low = range[0];
    let high = range[1];
    let accidentals = name[1];
    let durations = name[2];
    console.log("ACC,DURATIONS", accidentals, durations);
    let noteString = `${low}/${durations},${high}/${durations}`;
    console.log("NOTESTRING", noteString);
    return noteString;
    
  }
  
  componentDidMount() {
    this.props.getUserLessons();
  }

  render() {
    return (
      !this.props.lessons.length ? (
        <h1>Loading...</h1>
      ) : (
        <div style={styles.root}>
          <GridList
            cellHeight={"auto"}
            padding={10}
            cols={1}
            style={styles.gridList}
          >
            {this.props.lessons.map( lessonMeta => {
            
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

Lessons.propTypes = {
  lessons: PropTypes.array.isRequired,
  getUserLessons: PropTypes.func.isRequired
};

export default Lessons;
