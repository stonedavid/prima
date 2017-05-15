import React, {
    Component,
    PropTypes
}
from 'react';
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

import XpHistoryChart from "./xpHistoryChartComponent.js";
import LessonDetails from "./lessonDetailsComponent.js";

const styles = {
    card: {
        height: "100%",
        borderRadius: "inherit",
        padding: 20
    },
    
    chart: {
        margin: 10,
        padding: 10
    },
    
    paper: {
        display: "inline-block", 
        borderRadius: 20, 
        verticalAlign: "top", 
        marginTop: 20,
        right: "40vw",
        maxWidth: 300,
        maxHeight: 400,
        position: "fixed"
    }
}

const ProgressReport = ({totalXp, xpHistory, details, style}) => {
    return (
        <Paper zDepth={3} style={Object.assign({}, styles.paper, style)}>
            <Card style={styles.card}>
                <CardTitle title={"Progress Report"} subtitle={`XP Today: ${xpHistory[new Date().toDateString()] || "0"} Total XP: ${totalXp}`}  />
                <XpHistoryChart xpHistory={xpHistory} style={styles.chart}/>
                {details && <LessonDetails details={details} />}
            </Card>
        </Paper>
    )
}

export default ProgressReport;