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
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import Status from "./statusComponent.js";



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
        borderRadius: 5,
        display: "inline-block",
        background: "linear-gradient(rgb(244, 244, 244) 0%, rgba(255, 255, 255, 0.741176) 26%, rgb(255, 255, 255) 100%)"
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
        let accidentals = name[1];
        let durations = name[2];
        let noteString = `${low}/${durations},${high}/${durations}`;
        return noteString;

    }

    componentDidMount() {
        this.props.getUserLessons();
    }

    render() {
        return (!this.props.lessons.length ? (
            <h1>Loading...</h1>
        ) : (
            <Paper zDepth={3} style={{display: "inline-block"}}>
            <Card style={styles.card}>
                <CardTitle title={"Note Skills"} subtitle={"Level 25"} />
                    <div style={styles.root}>
                        <GridList
                            cellHeight={"auto"}
                            padding={5}
                            cols={3}
                            style={styles.gridList}
                        >
                            {this.props.lessons.map( lessonMeta => {
              
                            let active = lessonMeta.unlocked;
                            
                            let overdueRatio = ((Date.now() / 1000) - lessonMeta.timestamp) / lessonMeta.period;
                            let status = 1 / overdueRatio;
                            
                            console.log("LESSON STATUS", lessonMeta.name, status);
                            console.log(((Date.now() / 1000) - lessonMeta.timestamp) / 60, lessonMeta.period / 60 );
              
                            return (
                                <GridTile 
                                    style={
                                        { overflow: "visible" }
                                    }
                                    children={
                                        <FloatingTile
                                            initZ = {2}
                                            floatZ = {5}
                                            lessonMeta = { lessonMeta }
                                            email = { this.props.email }
                                            children = {[
                                            <Status status={status} />,
                                            <Display
                                                noteString = {this.cardsetToNoteString(lessonMeta)}
                                                line = {true}
                                                active = {active}
                                            />]
                                            }
                                        />
                                    }
                                />
                            )})
                        }
                        </GridList> 
                     </div> 
                </Card>
            </Paper>
            ));
        }
    }

Lessons.propTypes = {
    lessons: PropTypes.array.isRequired,
    getUserLessons: PropTypes.func.isRequired
};

export default Lessons;
