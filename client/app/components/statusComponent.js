import React from "react";

const Status = ({status}) => {
    let bgcolor, bordercolor, textcolor;
    switch (true) {
        case (status >= 1):
            console.log("STATUS GREATER THAN 1")
            bgcolor = "#ffd700";
            bordercolor = "goldenrod";
            textcolor = "darkgoldenrod";
            break;
        
        case (status >= 0.75):
            bgcolor = "#eae6dd"  
            bordercolor = "#eae6dd";
            textcolor = "dimgrey";
            break;
            
        case (status >= 0.25):
            bgcolor = "#f3f2f1";
            bordercolor = "#f3f2f1";
            textcolor = "silver";
            break;
            
        default:
            bgcolor = "#ffffff";
            bordercolor = "#ffffff";
            textcolor = "silver";
            
    }
    
    const percentage = status >= 1 ? "100%" :Math.round(status * 100) + "%";
    
    const style = {
        width: "190px",
        height: "60px",
        borderRadius: "20px",
        background: `linear-gradient(to top, ${bgcolor}, transparent)`,
        position: "absolute",
        bottom: -1,
        borderBottomStyle: "solid",
        borderBottomWidth: "5px",
        borderBottomColor: bordercolor,
        opacity: 0.5
    }
    
    return (
        <div className="statusBar" style={style}>
            <h2 fontFamily={"Roboto"} style={{marginTop: 15,color: textcolor}}>{percentage}</h2>
        </div>
    )
}

export default Status;