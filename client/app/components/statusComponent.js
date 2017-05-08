import React from "react";

import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';

const Status = ({status}) => {
    let bgcolor, bordercolor, textcolor, stars;
    let shinecolor = "white";
    switch (true) {
        case (status >= 1):
            console.log("STATUS GREATER THAN 1")
            bgcolor= "linear-gradient(70deg,goldenrod 20%, white 20%, goldenrod)";
            bordercolor = "goldenrod";
            textcolor = "darkgoldenrod";
            stars = [<Star color={"gold"} />,<Star color={"gold"} />,<Star color={"gold"} />];
            break;
        
        case (status >= 0.75):
            bgcolor = "linear-gradient(to right, white, white)"; 
            bordercolor = "#eae6dd";
            textcolor = "dimgrey";
            stars = [<Star color={"dimgrey"} />,<Star color={"dimgrey"} />,<StarBorder color={"dimgrey"} />];
            break;
            
        case (status >= 0.25):
            bgcolor = "linear-gradient(to right, white, white)"; 
            bordercolor = "#f3f2f1";
            textcolor = "silver";
            stars = [<Star color={"dimgrey"} />,<StarBorder color={"dimgrey"} />,<StarBorder color={"dimgrey"} />];
            break;
            
        default:
            bgcolor = "linear-gradient(to right, white, white)"; 
            bordercolor = "#ffffff";
            textcolor = "silver";
            stars = [<StarBorder color={"dimgrey"} />,<StarBorder color={"dimgrey"} />,<StarBorder color={"dimgrey"} />];
            
    }
    
    const percentage = status >= 1 ? "100%" :Math.round(status * 100) + "%";
    
    const style = {
        colorFade: {
            width: "180px",
            height: "195px",
            borderRadius: "20px",
            background: bgcolor,
            position: "absolute",
            border: `5px solid ${bordercolor}`,
            bottom: -1,
            opacity: 0.7
        },
        
        starBar: {
            position: "absolute", 
            bottom: 10, 
            left: 0, 
            right: 0
        }   
    }
    
    return (
        <div className="statusBar">
            <div className="colorFade" style = {style.colorFade}></div>
            <div className="starBar" style={style.starBar}>
                    {stars}
                </div>
        </div>
    )
}

export default Status;