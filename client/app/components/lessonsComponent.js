import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FloatingTile from "../containers/floatingTile.js";
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
    width: 1000,
    height: "auto",
    overflowY: 'auto',
  },
};

import Display from "./displayComponent.js";
    

    
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
                midiValues={ [61,62,63,64,65] }
                durations={ ["q","q","q","q","q"] }
                accidentals={ ["","","","",""] }
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
                midiValues={ [61,62,63,64,65] }
                durations={ ["q","q","q","q","q"] }
                accidentals={ ["","","","",""] }
                />
            }
          />
        }
      />
      <GridTile 
        cols={2}
        children={
          <FloatingTile
            initZ = {1}
            floatZ = {2}
            children = {
              <h1> Float Me! </h1>
            }
          />
        }
      />
    </GridList>
  </div>
);

export default Lessons;