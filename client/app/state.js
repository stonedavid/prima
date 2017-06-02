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
        audioContext: undefined,
        
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
            player: {
                name: "",
                email: "",
                totalXp: 0,
                currentDayXp: 0,
                xpHistory: []
            },
            userLessons: [], // array of data to create links on the curriculum page
            lessonMeta: null, // timestamp, difficulty, period data for cardset
            cardset: null, // array of cards
            gameValue: 10,
            currentCard: null,
            nextCard: null,
            currentScore: 0,
            totalNumberOfQuestions: 0,
            size: 49,
            offset: 36,
            settings: {
                clock: 9999
            },
            timestamp: 0,
            errors: null,
            modal: false,
            modalXpDisplay: {start: 0, end: 0},
            wrongPause: false
    }
};

export default state;