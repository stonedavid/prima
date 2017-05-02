import React from "react";

const Status = ({status}) => {
    const bgcolor = status >= 1 ? "gold" : "silver";
    const bordercolor = status >= 1 ? "goldenrod" : "slategrey";
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
            <h2 fontFamily={"Roboto"} style={{marginTop: 20,color: status > 1 ? "darkgoldenrod" : "black"}}>{percentage}</h2>
        </div>
    )
}

export default Status;