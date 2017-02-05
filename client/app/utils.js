import Vex from "vexflow";

const {
  Accidental,
  StaveNote,
} = Vex.Flow;

const noteDict = ["c","x","d","x","e","f","x","g","x","a","x","b"];
const accDict = {"#": -1, "b": 1};

export const createVexFlowChord = (midiNote,duration,accidental) => {
        let normal = midiNote%12;
        let octave = Math.floor(midiNote/12)-1;
        if (noteDict[normal] === "x") {
            if (midiNote>59) {
                return [new StaveNote({
                    clef: "treble",
                    keys: [noteDict[normal+accDict[accidental]] + "/" + octave],
                    duration: duration,
                    auto_stem: true
                })
                    .addAccidental(0, new Accidental(accidental))];
            } else {
                return [new StaveNote({clef: "bass",
                    keys: [noteDict[normal+accDict[accidental]] + "/" + octave],
                    duration: duration,
                    auto_stem: true
                })
                    .addAccidental(0, new Accidental(accidental))];
            }
        } else {
            if (midiNote>59) {
                return [new StaveNote({clef: "treble",
                    keys: [noteDict[normal] + "/" + octave],
                    duration: duration,
                    auto_stem: true
                })];
            } else {
                return [new StaveNote({clef: "bass",
                    keys: [noteDict[normal] + "/" + octave], 
                    duration: duration,
                    auto_stem: true
                })];
            }
        }
        
};