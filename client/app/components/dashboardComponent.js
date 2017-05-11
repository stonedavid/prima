import React, { Component } from "react";

import CircularProgress from 'material-ui/CircularProgress';

import Lessons from "../containers/lessonsContainer.js";
import ProgressReport from "../containers/progressReportContainer.js";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.getUserLessons();
    }
    
    render() {
        return ( !this.props.lessons.length ? <CircularProgress/> :
            <div>
                <Lessons lessons={this.props.lessons}/>
                <ProgressReport />
            </div>
        )
    }
}

export default Dashboard;