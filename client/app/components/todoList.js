import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import React, { Component } from "react";
import FlatButton from 'material-ui/FlatButton';

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: (<div key={Math.random()}>
                        {Math.floor(Math.random() * 10)}
                </div>)
        }
    }
    
    changeItem = () => {
        console.log(this.state);
        this.setState({
            item: (<div key={Math.random()}>
                        {Math.floor(Math.random() * 10)}
                </div>)
        })
    }
  
    render() {
        return <div style={{height: 100}}>
            <div style={{height: 50}}>
            <CSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={300}
                transitionLeave={false}>
                {this.state.item}
            </CSSTransitionGroup>
            </div>
            <FlatButton label="Change" secondary={true} onClick={() => this.changeItem()}/>
        </div>
    }
    
}

export default ImageCarousel;