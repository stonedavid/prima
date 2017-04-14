import React, { PropTypes } from "react";



const ProgressBar = ({progress}) => {
    const styles = {
        outer: {
            background: "#f80",
            margin: "auto",
            position: "relative",
            display: "block",
            width: "80%"
        },
        
        inner: {
            background: "#ddd",
            left: progress * 25,
            position: "absolute",
            top: 0,
            transition: '0.5s transform ease',
            borderRadius: 50
        }
    }
    
    return (
        <div style = {styles.outer}>
            <div style = {styles.inner}></div>
        </div>
    );
}
    
export default ProgressBar;