import React, { PropTypes } from "react";
import Nav from "./navBarContainer.js";

const Base = ({ children }) => (
    <div>
        <Nav />
        {children}
    </div>
    ); 
    
Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;

  