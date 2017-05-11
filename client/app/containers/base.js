import React, { PropTypes } from "react";
import Nav from "./navBarContainer.js";
import  { Sticky, StickyContainer } from "react-sticky"

const Base = ({ children }) => (
    <StickyContainer>
        <Sticky className={"Sticky"} topOffset={-10}>
                {(props)=> <Nav style={props.style}/>}
            </Sticky>
        {children}
    </StickyContainer>
    ); 
    
Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;

  