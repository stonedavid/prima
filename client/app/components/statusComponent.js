import React from "react";

import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';

const Status = ({status}) => {
    let bgcolor, bgcolor2, bordercolor, textcolor, stars;
    let shinecolor = "white";
    bgcolor= "linear-gradient(80deg, #fac64c 13%, transparent 14%), linear-gradient(#fef0d0  9%, #fac64c  66%)";
    switch (true) {
        case (status >= 1):
            bordercolor = "#fac64c";
            textcolor = "darkgoldenrod";
            stars = [<Star color={"#fef0d0"} />,<Star color={"#fef0d0"} />,<Star color={"#fef0d0"} />];
            break;
        
        case (status >= 0.75):
            bordercolor = "#eae6dd";
            textcolor = "dimgrey";
            stars = [<Star color={"dimgrey"} />,<Star color={"dimgrey"} />,<StarBorder color={"dimgrey"} />];
            break;
            
        case (status >= 0.25):
            bordercolor = "#f3f2f1";
            textcolor = "silver";
            stars = [<Star color={"dimgrey"} />,<StarBorder color={"dimgrey"} />,<StarBorder color={"dimgrey"} />];
            break;
            
        default:
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
            opacity: status >= 1 ? 0.7 : 0,
            transition: "all 2000ms ease-in-out"
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