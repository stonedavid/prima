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

const ProgressReport = ({currentDayXp, totalXp, xpHistory}) => {
    return (
        <Paper zDepth={3} style={{display: "inline-block", borderRadius:"10%"}}>
            <Card>
                <CardTitle title={"Progress Report"} subtitle={"Current Day XP, Total XP, Recent History"} />
            </Card>
        </Paper>
    )
}

export default ProgressReport;