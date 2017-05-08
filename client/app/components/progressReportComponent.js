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
    }
}

const ProgressReport = ({totalXp, xpHistory, details}) => {
    return (
        <Paper zDepth={3} style={{display: "inline-block", borderRadius: 20, verticalAlign: "top", margin: 20}}>
            <Card style={styles.card}>
                <CardTitle title={"Progress Report"} subtitle={`XP Today: ${xpHistory[new Date().toDateString()] || "0"} Total XP: ${totalXp}`}  />
                <XpHistoryChart xpHistory={xpHistory} style={styles.chart}/>
                <LessonDetails details={details} />
            </Card>
        </Paper>
    )
}

export default ProgressReport;