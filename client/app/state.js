const state = {
    
    inputDisplay: {
        queryNote: 60,
        keyboard: {
            size: 25,
            offset: 48,
          
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
        isAuthenticated: false
    }
}

export default state;