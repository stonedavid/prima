import React, { Component } from "react";

class Xp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: this.props.startValue
        }
        console.log("START+END", this.props.startValue, this.props.endValue);
    }
    
    componentDidMount() {
        setTimeout(() => this.increment(), 500);
    }
    
    componentDidUpdate() {
        console.log('xp updated');
        if (this.state.displayValue < this.props.endValue) {
            this.increment();
        }
    }
    
    increment() {
        const timeout = 1500 / (this.props.endValue - this.props.startValue);
        console.log("timeout", timeout);
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