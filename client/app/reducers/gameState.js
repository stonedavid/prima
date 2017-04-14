import { EVAL_NOTE, MOUNT_CARDS, SET_GAME_USER, SET_CLOCK, MOUNT_USER_LESSONS, SAVE_CARDS, SAVE_ERROR, UPDATE_META } from "../actions/actions.js";
import { calculateNextDueDate } from "../game/sm.js";

function gameState(state = {}, action) {
    switch (action.type) {
        case SET_GAME_USER:
            return Object.assign({},state, {
                player: {
                    name: action.form.userName,
                    email: action.form.email
                }
            });
            
        case MOUNT_USER_LESSONS:
            console.log("MOUNTING LESSONS", action.userLessons);
            return Object.assign({}, state, {
                userLessons: action.userLessons
            });
        
        case SET_CLOCK:
            console.log("SETTING CLOCK");
            return Object.assign({}, state, {
                timestamp: Date.now() / 1000

            });
        
        case EVAL_NOTE:
            
            // TODO: set up to handle an object of notestring keys, not an array
            
            let timestamp, 
            clock, 
            currentCard, 
            currentCardSet, 
            sortedCardSet,
            threshold,
            score,
            updatedCard,
            updatedCardSet,
            newCard;
            
            // Helper variables
            
            timestamp = (state.timestamp ? state.timestamp : Date.now() / 1000);
            clock = state.settings.clock;
            
            currentCard = state.currentCard;
            console.log("CURRENT CARD",currentCard);
            currentCardSet = state.cardset;
            
            threshold = 0.6;
            score = (currentCard.midiValue === action.midiValue ? 
                1 - Math.min( 1, ((Date.now() / 1000 - timestamp) / clock)): 0);
                
            console.log("TIME DELTA", ((Date.now()/1000 - timestamp)));
            console.log("SCORE:", score);
            console.log("CURRENT MIDI", currentCard.midiValue, "INPUT MIDI", action.midiValue);
            
            // Create updated card, insert in set
            
            updatedCard = calculateNextDueDate(currentCard,score,threshold);
                
            updatedCardSet = currentCardSet.map(card => 
                card.midiValue === currentCard.midiValue ? updatedCard : card
                );
                
            
            // Sorting should be changed here to retrieve card that maximizes this ratio    
            sortedCardSet = updatedCardSet.sort( (a, b) => {
                let x = ( (Date.now() / 1000) - a.timestamp ) / a.period; 
                let y = ( (Date.now() / 1000) - b.timestamp ) / b.period;
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
                
            newCard = sortedCardSet[0];

            return Object.assign({}, state, {
                currentCard: newCard,
                currentScore: (score > threshold ? state.currentScore + 1
                : Math.max(state.currentScore - 1, 0)),
                cardset: sortedCardSet,
                timestamp: Date.now() / 1000
                });
                
        case UPDATE_META:
            let updatedMeta = calculateNextDueDate(state.lessonMeta, 1.0, 0.5);
            
            return Object.assign({}, state, {
                lessonMeta: updatedMeta
            });
            
            
        case MOUNT_CARDS:
            return Object.assign({}, state, {
                lessonMeta: action.lessonMeta,
                cardset: action.cardset,
                currentCard: action.cardset[0],
                currentScore: 0
            });
            
        case SAVE_ERROR:
            
            console.log("SAVE ERROR", action.errors);
            return Object.assign({}, state, {
                errors: action.errors
            });
            
            
        default:
            return state;
    }
}

export default gameState;