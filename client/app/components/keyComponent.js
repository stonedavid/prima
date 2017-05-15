import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

const WhiteKeyElement = ({onPress,onRelease,midiValue,pressed,evaluation,xOffset,yOffset}) => {
    const left = xOffset - 300 + "px";
    const top = yOffset - 300 + "px";
    const offsetStyle = {left: left, top: top}
    const ripple = 
        <div 
            key={midiValue * Math.random() + "key"}
            className={ evaluation ? "ripple-effect-correct" : "ripple-effect-incorrect"}
            style={offsetStyle}
            >
        </div>;
    const transitionChild = pressed ? ripple : "";

    return (
    <span className={"white " + (pressed ? "pressed" : "")} 
        onMouseDown={(e) => onPress(e,midiValue)} 
        onTouchStart={(e) => onPress(e,midiValue)}
        //onMouseEnter={(e) => onPress(e,midiValue)}
        
        onMouseUp={(e) => onRelease(e,midiValue)} 
        onTouchEnd={(e) => onRelease(e,midiValue)}
        onMouseLeave={(e) => onRelease(e,midiValue)}>
        <div style={{width:"100%",height:"100%", background:"#fff",opacity:0.99}}>
        <CSSTransitionGroup
            transitionName="ripple"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={1000}
            >
                {transitionChild}
        </CSSTransitionGroup>
        { midiValue == 60 && <div style={{
            width: 0,
	        height: 0,
    	    borderLeft: "5px solid transparent",
	        borderRight: "5px solid transparent",
	        borderTop: "10px solid red",
	        borderTopLeftRadius: 10,
	        borderTopRightRadius: 10,
	        position: "absolute",
	        left: 15,
	        bottom: 5
        }}></div> }
        </div>
    </span>
    );
};

const BlackKeyElement = ({onPress,onRelease,midiValue,pressed,evaluation,xOffset,yOffset}) => {
    const left = xOffset - 300 + "px";
    const top = yOffset - 300 + "px";
    const offsetStyle = {left: left, top: top}
    const ripple = 
        <div 
            key={midiValue * Math.random() + "key"}
            className={ evaluation ? "ripple-effect-correct" : "ripple-effect-incorrect"}
            style={offsetStyle}
            >
        </div>;
    const transitionChild = pressed ? ripple : "";
    
    return (
    <span className={"black " + (pressed ? "pressed" : "")} 
        onMouseDown={(e) => onPress(e,midiValue)} 
        onTouchStart={(e) => onPress(e,midiValue)}
        //onMouseEnter={(e) => onPress(e,midiValue)}
        
        onMouseUp={(e) => onRelease(e,midiValue)} 
        onTouchEnd={(e) => onRelease(e,midiValue)}
        onMouseLeave={(e) => onRelease(e,midiValue)}>
        <div>
        <CSSTransitionGroup
            transitionName="ripple"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={1000}
            >
                {transitionChild}
        </CSSTransitionGroup>
        </div>
    </span>
    );
};

const WhiteKey = ({onPress,onRelease,midiValue,pressed,evaluation,xOffset,yOffset}) => (
    <li>
        <WhiteKeyElement
        onPress={onPress}
        onRelease={onRelease}
        midiValue={midiValue}
        pressed={pressed}
        evaluation={evaluation}
        xOffset={xOffset}
        yOffset={yOffset}
        />
    </li>
);

const BlackWhiteKey = ({onPress,onRelease,midiValue,whitePressed,blackPressed,
    whiteEvaluation,blackEvaluation,blackxOffset,blackyOffset,whitexOffset,whiteyOffset}) => (
    <li>
        <WhiteKeyElement
        onPress={onPress}
        onRelease={onRelease}
        midiValue={midiValue + 1}
        pressed={whitePressed}
        evaluation={whiteEvaluation}
        xOffset={whitexOffset}
        yOffset={whiteyOffset}
        />
        
        <BlackKeyElement
        onPress={onPress}
        onRelease={onRelease}
        midiValue={midiValue}
        pressed={blackPressed}
        evaluation={blackEvaluation}
        xOffset={blackxOffset}
        yOffset={blackyOffset}
        />
    </li>
);

WhiteKeyElement.propTypes = {
    onPress: PropTypes.func.isRequired,
    onRelease: PropTypes.func.isRequired,
    midiValue: PropTypes.number.isRequired,
    pressed: PropTypes.bool.isRequired
};

BlackKeyElement.propTypes = {
    onPress: PropTypes.func.isRequired,
    onRelease: PropTypes.func.isRequired,
    midiValue: PropTypes.number.isRequired,
    pressed: PropTypes.bool.isRequired
};

export { WhiteKey, BlackWhiteKey };