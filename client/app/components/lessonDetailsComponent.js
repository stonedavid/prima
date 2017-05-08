import React from "react";

const LessonDetails = ({details}) => {
    return (
        <div style={{width: "100px"}}>
            <p >{JSON.stringify(details)}</p>
        </div>
    );
};

export default LessonDetails;