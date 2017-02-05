/*TODO FIRST THING ---

FINISH UP KEY COMPONENTS SO THEY CONTROL THEIR OWN PRESSED STATE PROPERLY
*/


import React, { PropTypes } from "react";

const WhiteKeyElement = ({onPress,onRelease,midiValue,pressed}) => (
    <div className={"white " + (pressed ? "pressed" : "")} 
        onMouseDown={(e) => onPress(e,midiValue)} 
        onTouchStart={(e) => onPress(e,midiValue)}
        onMouseEnter={(e) => onPress(e,midiValue)}
        
        onMouseUp={(e) => onRelease(e,midiValue)} 
        onTouchEnd={(e) => onRelease(e,midiValue)}
        onMouseLeave={(e) => onRelease(e,midiValue)}>
    </div>

);

const BlackKeyElement = ({onPress,onRelease,midiValue,pressed}) => (
    <span className={(pressed ? "pressed" : "")} 
        onMouseDown={(e) => onPress(e,midiValue)} 
        onTouchStart={(e) => onPress(e,midiValue)}
        onMouseEnter={(e) => onPress(e,midiValue)}
        
        onMouseUp={(e) => onRelease(e,midiValue)} 
        onTouchEnd={(e) => onRelease(e,midiValue)}
        onMouseLeave={(e) => onRelease(e,midiValue)}/>
);

const WhiteKey = ({onPress,onRelease,midiValue,pressed}) => (
    <li>
        <WhiteKeyElement
        onPress={onPress}
        onRelease={onRelease}
        midiValue={midiValue}
        pressed={pressed}
        />
    </li>
);

const BlackWhiteKey = ({onPress,onRelease,midiValue,whitePressed,blackPressed}) => (
    <li>
        <WhiteKeyElement
        onPress={onPress}
        onRelease={onRelease}
        midiValue={midiValue + 1}
        pressed={whitePressed}
        />
        
        <BlackKeyElement
        onPress={onPress}
        onRelease={onRelease}
        midiValue={midiValue}
        pressed={blackPressed}
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