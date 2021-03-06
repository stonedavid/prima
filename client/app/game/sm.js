export const calculateNextDueDate = (card,score,threshold) => {
    
    let overdue, difficulty, difficultyWeight, period;
    
    let correct = 0;
    let incorrect = 0;
    
    let currentDate = new Date();
    
    if (score > threshold) {
        overdue = Math.min(2, ( (Date.now() / 1000) - card.timestamp ) / card.period );
        difficulty = Math.max(0,card.difficulty + overdue * ( 1/17 * ( 8 - 9 * score ) ));
        
        difficultyWeight = 3 - ( 1.7 * difficulty );
        period = card.period * Math.min( 2, ( 1 + ( difficultyWeight - 1) * overdue ) ); //clipping to doubling the period -- otherwise it can be up to 6 times longer
        
        correct = 1;
        
    } else {
        overdue = 1;
        difficulty = Math.min(1,card.difficulty + overdue * ( 1/17 * ( 8 - 9 * score ) ));
        difficultyWeight = 3 - ( 1.7 * difficulty );
        period = Math.max( 2, card.period * ( 1/( difficultyWeight * difficultyWeight ) ) );
        console.log("period for incorrect card or lesson:",period);
        
        incorrect = 1;
    }
    
    return Object.assign({}, card, {
                difficulty: difficulty,
                period: period,
                timestamp: Date.now() / 1000,
                timesSeen: card.timesSeen + 1,
                timesCorrect: card.timesCorrect + correct,
                timesIncorrect: card.timesIncorrect + incorrect,
                timestampReadable: currentDate.toDateString()
                
            });
};
