import  { generateCardSet } from "./lessons/noteIdentification.js";

let cardSet = generateCardSet(55,67,["#","b"]);

const state = {
    
    navigation: {
        currentPage: "/"
    },
    
    inputDisplay: {
        queryNote: 60,
        keyboard: {
            keys: []
        },
        audioPlayer: undefined,
        audioContext: undefined
    },
    
    auth: {
        email: "",
        password: "",
        token: "",
        userName: "",
        isAuthenticated: false,
        errors: {}
    },
    
    gameState: {
            lesson: cardSet,
            currentCard: cardSet.cards[0],
            history: [],
            currentScore: 0,
            size: 25,
            offset: 48,
            timestamp: undefined,
            settings: {
                clock: 20
            }
    }
};

export default state;