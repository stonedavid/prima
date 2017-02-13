import React, { Component } from 'react';
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
 
class FloatingTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zDepth: props.initZ
        }
    };
    
    onMouseOver = () => this.setState({ zDepth: this.props.floatZ});
    onMouseOut = () => this.setState({ zDepth: this.props.initZ});
    
    render() {
        console.log(this.state);
        return (
            <Paper 
                style = {{
                    margin: 20,
                    textAlign: 'center',
                    display: 'inline-block',
                    borderRadius: "20px",
                    padding: 0
                }}
                zDepth = { this.state.zDepth }
                onMouseOver = { this.onMouseOver }
                onMouseOut = { this.onMouseOut }
                >
                { this.props.children }
            </Paper>
        );
            
    }
}

export default FloatingTile;