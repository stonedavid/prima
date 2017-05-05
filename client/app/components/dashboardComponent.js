import React from "react";

import Lessons from "../containers/lessonsContainer.js";
import ProgressReport from "./progressReportComponent.js";

const Dashboard = () => {
    return (
        <div>
            <Lessons />
            <ProgressReport currentDayXp={25} totalXp={2500} xpHistory={[1,2,3]} />
        </div>
    )
}

export default Dashboard;