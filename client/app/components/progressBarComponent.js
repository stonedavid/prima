import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";



const ProgressBar = ({progress}) => {
    const styles = {
        outer: {
            background: "#eee",
            margin: "auto",
            position: "relative",
            display: "block",
            width: "100%",
            height: 10
            
        },
        
        inner: {
            position: "absolute",
            top: 0,
            width: `${progress}%`,
            height: 10
        }
    }
    
    return (
        <div style = {styles.outer}>
            <div className={"progress"} style = {styles.inner}></div>
        </div>
    );
}
    
export default ProgressBar;