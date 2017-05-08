import React from "react";
import {Line} from "react-chartjs-2";



const Chart = ({xpHistory,style}) => {
    let xpHistoryArray = [];
    let day = new Date().toDateString();
    let xpFromHistory;
    let labels = [];
    
    for (var i = 1; i < 8; i++) {
        labels.unshift(day.split(" ")[0]);
        xpFromHistory = xpHistory[day] ? xpHistory[day] : 0;
        xpHistoryArray.unshift(xpFromHistory);
        day = new Date(Date.now() - (i*(1000 * 3600 * 24))).toDateString();
    }
    
    console.log("History array",xpHistoryArray);
    
    const data = {
        labels: labels,
            datasets: [
    {
      label: 'Daily Progress',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: xpHistoryArray
        }
    ]
    };
    return (
      <div className={"xpHistoryChart"} style={style}>
        <Line data={data} />
      </div>
    );
};

export default Chart;



