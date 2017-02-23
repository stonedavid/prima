export const calculateNextDueDate = (card,score,threshold) => {
    
    let overdue, difficulty, difficultyWeight, period; 
    
    if (score > threshold) {
        overdue = Math.min(2, ( (Date.now() / 1000) - card.timestamp ) / card.period );
        difficulty = Math.max(0,card.difficulty + overdue * ( 1/17 * ( 8 - 9 * score ) ));
        
        difficultyWeight = 3 - ( 1.7 * difficulty );
        period = card.period * ( 1 + ( difficultyWeight - 1) * overdue );
        
    } else {
        overdue = 1;
        difficulty = Math.min(1,card.difficulty + overdue * ( 1/17 * ( 8 - 9 * score ) ));
        difficultyWeight = 3 - ( 1.7 * difficulty );
        period = card.period * ( 1/( difficultyWeight * difficultyWeight ) );
    }
    
    return Object.assign({}, card, {
                difficulty: difficulty,
                period: period,
                timestamp: Date.now() / 1000
            });
};
