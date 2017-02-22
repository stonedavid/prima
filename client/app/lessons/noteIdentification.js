// first challenge, how do I name lessons?
// i would really have to set specific ranges, which i'm not necessarily a huge fan of
// you could increment up the range as you gain xp, but i think crossing modules off the list
// is more satisfying

// there are a few ways to sort... i think duo does a module sort based on the last time any 
// part of a module was reviewed, and then does an individual sort within the module

/**
 * Card schema
 *
 * {
     noteString: string, [A-G][#,b,n,""][0-8] / [w,h,q,8,16],
     midiValue: int, [0-127],
     difficulty: 0.3,
     timestamp: Math.random(),
     due: 1, this is the refractory period in seconds
 }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */




/*
 * Example module for just 5 notes
 */

export const generateCardSet = (minimumMidi, maximumMidi, accidentals) => {
    const noteDict = ["c","x","d","x","e","f","x","g","x","a","x","b"];
    const accDict = {"#": -1, "b": 1};
    const size = maximumMidi - minimumMidi;
    const midiArray = [...Array(size||0)].map((v,i)=>i + minimumMidi);
    const cardSet = [];
    midiArray.forEach(function(midiNote) {
        let normal = midiNote%12;
        let octave = Math.floor(midiNote/12)-1;
        
        if (noteDict[normal] === "x" && accidentals.length) {
            accidentals.forEach(function(accidental) {
                let noteString = noteDict[normal+accDict[accidental]] + accidental + octave + "/" + "q";
                cardSet.push({
                    noteString: noteString,
                    midiValue: midiNote,
                    difficulty: 0.3,
                    timestamp: Math.random(),
                    due: 1
                })
            })
        } else if (noteDict[normal] !== "x") {
            let noteString = noteDict[normal] + octave + "/" + "q";
            cardSet.push({
                noteString: noteString,
                midiValue: midiNote,
                difficulty: 0.3,
                timestamp: Math.random(),
                due: 1
            })
        }
    });
        
    return {
        timestamp: 0,
        cards: cardSet.sort( (a, b) => {
                let x = ( (Date.now() / 1000) - a.timestamp ) / a.due; 
                let y = ( (Date.now() / 1000) - b.timestamp ) / b.due;
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            })
    };
}
