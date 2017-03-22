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
 
class FloatingTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zDepth: props.initZ
        }
    };
    
    onMouseOver = () => this.setState({ zDepth: this.props.floatZ});
    onMouseOut = () => this.setState({ zDepth: this.props.initZ});
    onClick = this.props.onClick;
    
    render() {
        return (
            <Paper 
                style = {{
                    marginBottom: 22,
                    marginTop: 10,
                    textAlign: 'center',
                    display: 'inline-block',
                    borderRadius: "20px",
                    padding: 0
                }}
                zDepth = { this.state.zDepth }
                onMouseOver = { this.onMouseOver }
                onMouseOut = { this.onMouseOut }
                onClick = { this.onClick }
                >
                { this.props.children }
            </Paper>
        );
            
    }
}

FloatingTile.propTypes = {
    initZ: PropTypes.number.isRequired,
    floatZ: PropTypes.number.isRequired,
    lessonMeta: PropTypes.object.isRequired
};

export default FloatingTile;