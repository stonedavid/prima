import React from "react";

import Lessons from "../containers/lessonsContainer.js";
import ProgressReport from "../containers/progressReportContainer.js";

const Dashboard = () => {
    return (
        <div>
            <Lessons />
            <ProgressReport />
        </div>
    )
}

export default Dashboard;