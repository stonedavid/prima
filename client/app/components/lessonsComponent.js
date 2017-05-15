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



import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
}
from 'material-ui/Card';
import Paper from "material-ui/Paper";
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import Status from "./statusComponent.js";
import Sharp from "./sharpSvgComponent.js";



const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 600,
        marginTop: 30,
    },
    card: {
        padding: 20,
        borderRadius: "inherit",
        display: "inline-block",
        background: "linear-gradient(rgb(244, 244, 244) 0%, rgba(255, 255, 255, 0.741176) 26%, rgb(255, 255, 255) 100%)",
    },
    
    paper: {
        display: "inline-block",
        marginTop: 20,
        marginLeft: 20,
        marginRight: "60vw",
        borderRadius: 20,
    }
};

import Display from "./displayComponent.js";

// ok component cannot be dumb -- should the state be in redux??? like, literally just the loading state???
// does any other component care about it??? NO



class Lessons extends Component {
    constructor(props) {
        super(props);
    }

    cardsetToNoteString = (lessonMeta) => {

        let name = lessonMeta.name.split("_");
        let range = name[0].split("-");
        let low = range[0];
        let high = range[1];
        let durations = name[2];
        let noteString = `${low}/${durations},${high}/${durations}`;
        return noteString;

    }

    render() {
        return (
            <Paper zDepth={3} style={styles.paper}>
            <Card style={styles.card}>
                <CardTitle title={"Note Skills"} subtitle={"Total XP: " + this.props.totalXp} />
                    <div style={styles.root}>
                        <GridList
                            cellHeight={"auto"}
                            padding={5}
                            cols={3}
                            style={styles.gridList}
                        >
                            {this.props.lessons.map( lessonMeta => {
                            
                            let levelHeading, active, overdueRatio, status;
                            
                            if (lessonMeta.levelHeading) {
                                levelHeading = lessonMeta.levelHeading;
                            } else {
                                active = lessonMeta.unlocked;
                                overdueRatio = ((Date.now() / 1000) - lessonMeta.timestamp) / lessonMeta.period;
                                status = 1 / overdueRatio * 0.9; // 90% when lesson is due
                            }
                            
                            return (
                                !levelHeading ?
                                <GridTile 
                                    style={
                                        { overflow: "visible" }
                                    }
                                    children={
                                        <FloatingTile
                                            initZ = {0.1}
                                            floatZ = {0.5}
                                            lessonMeta = { lessonMeta }
                                            email = { this.props.email }
                                            children = {[
                                            <Status status={status} />,
                                            <Display
                                                noteString = {this.cardsetToNoteString(lessonMeta)}
                                                line = {true}
                                                active = {active}
                                                golden = {false}
                                                accidentals = {lessonMeta.accidentals}
                                            />]
                                            }
                                        />
                                    }
                                /> : <GridTile
                                        cols={3}
                                        children={
                                            <CardTitle title={"Level 2"} subtitle={lessonMeta.title} />
                                        }
                                    />
                            )})
                        }
                        </GridList> 
                     </div> 
                </Card>
            </Paper>
            );
        }
    }

Lessons.propTypes = {
    lessons: PropTypes.array.isRequired,
    getUserLessons: PropTypes.func.isRequired
};

export default Lessons;
