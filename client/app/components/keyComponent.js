import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

const WhiteKeyElement = ({onPress,onRelease,midiValue,pressed,evaluation,xOffset,yOffset}) => {
    const left = xOffset - 300 + "px";
    const top = yOffset - 300 + "px";
    const offsetStyle = {left: left, top: top}
    if (pressed) {
        console.log("STYLE",offsetStyle)
    };
    const ripple = 
        <div 
            key={midiValue * Math.random() + "key"}
            className={ evaluation ? "ripple-effect-correct" : "ripple-effect-incorrect"}
            style={offsetStyle}
            >
        </div>;
    const transitionChild = pressed ? ripple : "";

    return (
    <div className={"white " + (pressed ? "pressed" : "")} 
        onMouseDown={(e) => onPress(e,midiValue)} 
        onTouchStart={(e) => onPress(e,midiValue)}
        onMouseEnter={(e) => onPress(e,midiValue)}
        
        onMouseUp={(e) => onRelease(e,midiValue)} 
        onTouchEnd={(e) => onRelease(e,midiValue)}
        onMouseLeave={(e) => onRelease(e,midiValue)}>
        <div style={{overflow:"hidden",width:"100%",height:"100%", background:"#fff",opacity:0.99}}>
        <CSSTransitionGroup
            transitionName="ripple"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={600}
            >
                {transitionChild}
        </CSSTransitionGroup>
        </div>
    </div>
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
        onMouseEnter={(e) => onPress(e,midiValue)}
        
        onMouseUp={(e) => onRelease(e,midiValue)} 
        onTouchEnd={(e) => onRelease(e,midiValue)}
        onMouseLeave={(e) => onRelease(e,midiValue)}>
        <div>
        <CSSTransitionGroup
            transitionName="ripple"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={600}
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