import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";



const ProgressBar = ({progress}) => {
    const styles = {
        outer: {
            background: "#FFF",
            margin: "auto",
            position: "relative",
            display: "block",
            height: 18,
            borderRadius: 12,
            boxShadow: "inset 1px 2px 15px grey"
            
        },
        
        inner: {
            position: "absolute",
            top: 0,
            width: `${progress}%`,
            height: "inherit",
            borderRadius: "inherit"
        }
    }
    
    return (
        <div style = {styles.outer}>
            <div className={"progress"} style = {styles.inner}></div>
        </div>
    );
}
    
export default ProgressBar;