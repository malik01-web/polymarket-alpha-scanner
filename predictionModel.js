
export function predictProbability(market){

let score = 0

score += (market.volume || 0) * 0.000001
score += (market.liquidity || 0) * 0.000002

return Math.min(score,1)

}

export function calculateEdge(market){

const predicted = predictProbability(market)
const marketProb = market.lastTradePrice || 0

return predicted - marketProb

}
