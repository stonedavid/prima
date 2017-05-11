import React, { Component, PropTypes } from 'react';
import Paper from "material-ui/Paper";

/**
 * FloatingTile wraps children in a Paper component that floats on mouseover
 * 
 * props = {
 *  children: object or react component
 *  initZ: int
 *  floatZ: int
 * }
 * 
 **/
 
 const shadowStyle = {
     boxShadow: "0px 10px 30px black",
     position: "absolute",
     top: 0,
     right: 0,
     left: 3,
     width: "97%",
     height: "100%",
     borderRadius: "20px",
     pointerEvents: "none",
 };
 
class FloatingTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zDepth: props.initZ
        }
    };
    
    onMouseOver = () => {console.log("mouseover");this.setState({ zDepth: this.props.floatZ});}
    onMouseOut = () => this.setState({ zDepth: this.props.initZ});
    onClick = this.props.onClick;
    
    
    render() {
        return (
        <div onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
            <Paper 
                style = {{
                    textAlign: 'center',
                    display: 'inline-block',
                    borderRadius: "20px",
                    padding: 0
                }}
                zDepth = { 1 }
                onMouseOver = { this.onMouseOver }
                onMouseOut = { this.onMouseOut }
                onClick = { this.onClick }
                >
                { this.props.children }
            </Paper>
            <div style={Object.assign({},shadowStyle,{opacity: this.state.zDepth})}></div>
        </div>
        );
            
    }
}

FloatingTile.propTypes = {
    initZ: PropTypes.number.isRequired,
    floatZ: PropTypes.number.isRequired,
    lessonMeta: PropTypes.object.isRequired
};

export default FloatingTile;