import React, { Component } from "react";

class Xp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: this.props.startValue
        }
    }
    
    componentDidMount() {
        setTimeout(() => {this.increment()},500);
    }
    
    componentDidUpdate() {
        if (this.state.displayValue < this.props.endValue) {
            this.increment();
        }
    }
    
    increment() {
        const timeout = 1000 / (this.state.displayValue - this.props.startValue);
        setTimeout(() => {this.setState({displayValue: this.state.displayValue + 1})}, timeout);
    }
    
    render() {
        
        return (
            <div style={{display: "inline-block"}}>
                <h2>{this.state.displayValue}</h2>
            </div>
        )
    }
}

export default Xp;