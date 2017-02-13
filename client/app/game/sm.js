export const calculateNextDueDate = (card,score,threshold) => {
    
    let overdue, difficulty, difficultyWeight, due;
    
    console.log("Init diff:",card.difficulty);
    
    if (score > threshold) {
        overdue = Math.min(2, ( (Date.now() / 1000) - card.timestamp ) / card.due );
        difficulty = Math.max(0,card.difficulty + overdue * ( 1/17 * ( 8 - 9 * score ) ));
        
        difficultyWeight = 3 - ( 1.7 * difficulty );
        due = card.due * ( 1 + ( difficultyWeight - 1) * overdue );
        
    } else {
        overdue = 1;
        difficulty = Math.min(1,card.difficulty + overdue * ( 1/17 * ( 8 - 9 * score ) ));
        difficultyWeight = 3 - ( 1.7 * difficulty );
        due = card.due * ( 1/( difficultyWeight * difficultyWeight ) );
    }
    
    return Object.assign({}, card, {
                difficulty: difficulty,
                due: due,
                timestamp: Date.now() / 1000
            });
};