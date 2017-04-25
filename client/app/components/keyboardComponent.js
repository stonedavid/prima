import  React, { PropTypes } from "react";
import { WhiteKey, BlackWhiteKey } from "./keyComponent";

const populateKeyComponents = (keyObjects, onPress, onRelease) => {

        const noteMap = ["w", "b", "s", "b", "s", "w", "b", "s", "b", "s", "b", "s"];
        let keyComponentArray = [];

        for (let i = 0; i < keyObjects.length; i++) {
            let keyType = noteMap[keyObjects[i].midiValue % 12];
            switch (keyType) {
                case "w":
                    keyComponentArray.push(
                        <WhiteKey
                        // Callbacks
                        onPress = {
                            onPress
                        }
                        onRelease = {
                            onRelease
                        }

                        // State from keyObjects array
                        midiValue = {
                            keyObjects[i].midiValue
                        }
                        pressed = {
                            keyObjects[i].pressed
                        }
                        
                        evaluation = {
                            keyObjects[i].evaluation
                        }
                        
                        xOffset = {
                            keyObjects[i].xOffset
                        }
                        
                        yOffset = {
                            keyObjects[i].yOffset
                        }
                        // Key
                        key = {keyObjects[i].midiValue}
                        />);
                        break;

                case "b":
                    keyComponentArray.push(
                        <BlackWhiteKey

                        // Callbacks
                        onPress = {
                            onPress
                        }
                        onRelease = {
                            onRelease
                        }

                        // State from keyObjects array
                        midiValue = {
                            keyObjects[i].midiValue
                        }
                        blackPressed = {
                            keyObjects[i].pressed
                        }
                        whitePressed = {
                            keyObjects[i + 1].pressed // THIS IS THE SOURCE OF THE ERROR! NO HANGING BLACK KEYS!
                        }
                        blackEvaluation = {
                            keyObjects[i].evaluation
                        }
                        whiteEvaluation = {
                            keyObjects[i+1].evaluation
                        }
                        
                        whitexOffset = {
                            keyObjects[i + 1].xOffset
                        }
                        
                        blackxOffset = {
                            keyObjects[i].xOffset
                        }
                        
                        whiteyOffset = {
                            keyObjects[i + 1].yOffset
                        }
                        
                        blackyOffset = {
                            keyObjects[i].yOffset
                        }
                        
                        // Key
                        key = {keyObjects[i].midiValue}
                        />);
                        break;

                    case "s":
                        break;
                        }
                }
                return keyComponentArray;
            };

const Keyboard = ({ keys, onPress, onRelease }) => {
    let keyComponentArray = populateKeyComponents(keys, onPress, onRelease);
    let ulStyle = {
        width: (keyComponentArray.length * 40) + "px"
    };
    let wrapperStyle = {
        display: "inline-block",
        margin: "0 auto",
        width: "100%",
        maxWidth: (keyComponentArray.length * 40) + "px"
    };
    return (
        <div style={{display:"block", padding:"18px"}}>
            <div id="p-wrapper" style={wrapperStyle}>
                <ul id="piano" style={ulStyle}>
                    {keyComponentArray}
                </ul>
		    </div>
		</div>
        );
};


Keyboard.PropTypes = {
    keys: PropTypes.arrayOf(PropTypes.shape({
        midiValue: PropTypes.number.isRequired,
        pressed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onPress: PropTypes.func.isRequired,
    onRelease: PropTypes.func.isRequired
}


export default Keyboard;