
let count = 0

export function weighted_random(items) {
    let i;
    const weights = [0.23, 0.05, 0.51, 0.13, 0.08]
    
    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    
    let random = Math.random() * weights[weights.length - 1];
        
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
            
    return items[i];
}


