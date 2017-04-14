// first challenge, how do I name lessons?
// i would really have to set specific ranges, which i'm not necessarily a huge fan of
// you could increment up the range as you gain xp, but i think crossing modules off the list
// is more satisfying

// there are a few ways to sort... i think duo does a module sort based on the last time any 
// part of a module was reviewed, and then does an individual sort within the module
// for each is slow, who cares, i dunno

// THIS STILL NEEDS THE LOOPS TO BE SET FOR DURATIONS AND ACCIDENTALS...USE MAP??
// CAREFUL -- THIS LOOP ALREADY QUIETLY HANDLES DIATONIC SETS WITH "ELSE IF"

exports.generateCardSet = function(minimumMidi, maximumMidi, accidentals, durations) {
    const noteDict = ["c","x","d","x","e","f","x","g","x","a","x","b"];
    const accDict = {"#": -1, "b": 1};
    const size = maximumMidi - minimumMidi;
    const midiArray = Array.apply(null, Array(size)).map(function (_, i) {return i + minimumMidi;});
    const cardSet = {};
    midiArray.forEach(function(midiNote) {
        var normal = midiNote%12;
        var octave = Math.floor(midiNote/12)-1;
        
        if (noteDict[normal] === "x" && accidentals.length) {
            durations.forEach(function(duration) {
                accidentals.forEach(function(accidental) {
                    var noteString = noteDict[normal+accDict[accidental]] + accidental + octave + "/" + duration;
                    cardSet[noteString] = {
                        noteString: noteString,
                        midiValue: midiNote,
                        accidental: accidental,
                        difficulty: 0.3,
                        timestamp: Math.random(),
                        period: 1,
                        timesSeen: 0,
                        timesCorrect: 0,
                        timesIncorrect: 0,
                        timestampReadable: 0
                    };
                });
            });
        } else if (noteDict[normal] !== "x") {
            durations.forEach(function(duration) {
                var noteString = noteDict[normal] + octave + "/" + duration;
                cardSet[noteString] = {
                    noteString: noteString,
                    midiValue: midiNote,
                    accidental: null,
                    difficulty: 0.3,
                    timestamp: Math.random(),
                    period: 1,
                    timesSeen: 0,
                    timesCorrect: 0,
                    timesIncorrect: 0,
                    timestampReadable: 0
                };
            });
        }
    });
        
    return cardSet;
};

exports.generateCardNames = function(minimumMidi, maximumMidi, accidentals, durations) {
    const noteDict = ["c","x","d","x","e","f","x","g","x","a","x","b"];
    const accDict = {"#": -1, "b": 1};
    const size = maximumMidi - minimumMidi;
    const midiArray = Array.apply(null, Array(size)).map(function (_, i) {return i + minimumMidi;});
    const cardNames = [];
    midiArray.forEach(function(midiNote) {
        var normal = midiNote%12;
        var octave = Math.floor(midiNote/12)-1;
        
        if (noteDict[normal] === "x" && accidentals.length) {
            durations.forEach(function(duration) {
                accidentals.forEach(function(accidental) {
                    var noteString = noteDict[normal+accDict[accidental]] + accidental + octave + "/" + duration
                    cardNames.push(noteString)
                });
            });
        } else if (noteDict[normal] !== "x") {
            durations.forEach(function(duration) {
                var noteString = noteDict[normal] + octave + "/" + duration;
                cardNames.push(noteString)
            });
        }
    });
    
    return cardNames;
};
