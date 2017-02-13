import { EVAL_NOTE } from "../actions/actions.js";
import { calculateNextDueDate } from "../game/sm.js";

function gameState(state = {}, action) {
    switch (action.type) {
        case EVAL_NOTE:
            
            let timestamp, 
            clock, 
            currentCard, 
            currentCardSet, 
            sortedCardSet,
            threshold,
            score,
            updatedCard,
            updatedCardSet,
            updatedLesson,
            newCard;
            
            // Helper variables
            
            
            timestamp = (state.timestamp ? state.timestamp : Date.now() / 1000);
            clock = state.settings.clock;
            
            currentCard = state.currentCard;
            currentCardSet = state.lesson.cards;
            
            threshold = 0.6;
            score = (currentCard.midiValue === action.midiValue ? 
                1 - Math.min( 1, ((Date.now() / 1000 - timestamp) / clock)): 0);
            
            console.log("SCORE:", score);
            
            // Create updated card, insert in set, and insert in lesson
            
            
            updatedCard = calculateNextDueDate(currentCard,score,threshold);
                
            updatedCardSet = currentCardSet.map(card => 
                card.midiValue === currentCard.midiValue ? updatedCard : card
                );
                
            sortedCardSet = updatedCardSet.sort( (a, b) => {
                let x = ( (Date.now() / 1000) - a.timestamp ) / a.due; 
                let y = ( (Date.now() / 1000) - b.timestamp ) / b.due;
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
                
            updatedLesson = Object.assign({}, state.lesson, {
                    cards: sortedCardSet
                });
                
            newCard = sortedCardSet[0];
                
            console.log(updatedCardSet.map(card => card.noteString));

            return Object.assign({}, state, {
                currentCard: newCard,
                currentScore: (score > threshold ? state.currentScore + 1
                : Math.max(state.currentScore - 1, 0)),
                lesson: updatedLesson,
                timestamp: Date.now() / 1000
                });
            
        default:
            return state;
    }
}

export default gameState;