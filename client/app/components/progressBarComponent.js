import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";



const ProgressBar = ({progress}) => {
    const styles = {
        outer: {
            background: "#eee",
            margin: "auto",
            position: "relative",
            display: "block",
            height: 18,
            borderRadius: 10
            
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