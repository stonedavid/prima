import React from "react";

const LessonDetails = ({details}) => {
    const detailsDate = details.timestamp < 1 ? "--" : new Date(details.timestamp * 1000);
    
    const dueDate = detailsDate === "--" ? "--" : details.timestamp < 1 ? "--" : new Date(details.timestamp * 1000 + details.period * 1000);
    let dueDateTimeString = formatTime(dueDate) + " " + formatDate(dueDate);
    let detailsDateTimeString = formatTime(detailsDate) + " " + formatDate(detailsDate);
    
    function formatTime(date) {
        
        let formattedString = "--";
        
        if (date !== "--") {
            let dateTime = date.toTimeString().split(" ")[0];
    
            if (parseInt(dateTime.split(":")[0]) === 0) {
                formattedString = "12:" + dateTime.split(":").slice(1).join(":") + " AM";
            } else if (parseInt(dateTime.split(":")[0]) === 12) {
                formattedString = "12:" + dateTime.split(":").slice(1).join(":") + " PM";
            } else if (parseInt(dateTime.split(":")[0]) > 11) {
                formattedString = (parseInt(dateTime.split(":")[0])%12) + ":" + dateTime.split(":").slice(1).join(":") + " PM";
            } else {
                formattedString = (parseInt(dateTime.split(":")[0])%12) + ":" + dateTime.split(":").slice(1).join(":") + " AM";
            }
        }
        
        return formattedString;
    }
    
    function formatDate(date) {
        
        let formattedString = "";
        
        if (date !== "--") {
            
            let dateAsArray = date.toDateString().split(" ").slice(0,3);
            
            if (dateAsArray[2].split("")[0] === "0") { 
                dateAsArray.splice(2,1,dateAsArray[2].split("")[1]);
            }
            
            formattedString = dateAsArray.join(" ");
            
        }
        
        return formattedString;
    }
    
    
    return (
        <div style={{width: "100%", textAlign: "left"}}>
            <span style={{fontSize:"16px"}}>Last Played: <span style={{fontSize:"12px",color:"rgba(0,0,0,0.54)"}}>{detailsDateTimeString}</span></span>
            <br/>
            <span style={{fontSize:"16px"}}>Review Due: <span style={{fontSize:"12px",color:"rgba(0,0,0,0.54)"}}>{dueDateTimeString}</span></span>
            <br/>
            <span style={{fontSize:"16px"}}>Times Played: <span style={{fontSize:"12px",color:"rgba(0,0,0,0.54)"}}>{details.timesSeen}</span></span>
        </div>
    );
};

export default LessonDetails;