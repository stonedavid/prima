// first challenge, how do I name lessons?
// i would really have to set specific ranges, which i'm not necessarily a huge fan of
// you could increment up the range as you gain xp, but i think crossing modules off the list
// is more satisfying

// there are a few ways to sort... i think duo does a module sort based on the last time any 
// part of a module was reviewed, and then does an individual sort within the module
// for each is slow, who cares, i dunno


// THIS STILL NEEDS THE LOOPS TO BE SET FOR DURATIONS AND ACCIDENTALS...USE MAP??
// CAREFUL -- THIS LOOP ALREADY QUIETLY HANDLES DIATONIC SETS WITH "ELSE IF"

export const generateCardSet = (minimumMidi, maximumMidi, accidentals, durations) => {
    const noteDict = ["c","x","d","x","e","f","x","g","x","a","x","b"];
    const accDict = {"#": -1, "b": 1};
    const size = maximumMidi - minimumMidi;
    const midiArray = [...Array(size||0)].map((v,i)=>i + minimumMidi);
    const cardSet = [];
    midiArray.forEach(function(midiNote) {
        let normal = midiNote%12;
        let octave = Math.floor(midiNote/12)-1;
        
        if (noteDict[normal] === "x" && accidentals.length) {
            durations.forEach(function(duration) {
                accidentals.forEach(function(accidental) {
                    let noteString = noteDict[normal+accDict[accidental]] + accidental + octave + "/" + duration
                    cardSet.push({
                        noteString: noteString,
                        midiValue: midiNote,
                        difficulty: 0.3,
                        timestamp: Math.random(),
                        period: 1
                    });
                });
            });
        } else if (noteDict[normal] !== "x") {
            durations.forEach(function(duration) {
                let noteString = noteDict[normal] + octave + "/" + duration;
                cardSet.push({
                    noteString: noteString,
                    midiValue: midiNote,
                    difficulty: 0.3,
                    timestamp: Math.random(),
                    period: 1
                })
            });
        }
    });
        
    return cardSet.sort( (a, b) => {
                let x = ( (Date.now() / 1000) - a.timestamp ) / a.due; 
                let y = ( (Date.now() / 1000) - b.timestamp ) / b.due;
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            })

}
