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
            player: {
                name: "",
                email: ""
            },
            userLessons: null, // array of data to create links on the curriculum page
            lessonMeta: null, // timestamp, difficulty, period data for cardset
            cardset: null, // array of cards
            currentCard: null,
            history: [],
            currentScore: 0,
            size: 25,
            offset: 48,
            settings: {
                clock: 20
            },
            errors: null
    }
};

export default state;