import { predictProbability, calculateEdge } from "./predictionModel.js"
import { rankMarkets } from "./rankingEngine.js"

async function loadMarkets(){

try{

const res = await fetch("/.netlify/functions/markets")

if(!res.ok){
console.error("API error:", res.status)
return
}

const markets = await res.json()

console.log("Markets loaded:", markets)

const table = document.getElementById("markets")
table.innerHTML=""

const enriched = markets.map(m=>{

const ai = predictProbability(m)
const edge = calculateEdge(m)

return {
...m,
aiProb: ai,
edge: edge
}

})

const ranked = rankMarkets(enriched)

ranked.slice(0,40).forEach(m=>{

const row = `
<tr>
<td>${m.question}</td>
<td>${(m.lastTradePrice*100).toFixed(1)}%</td>
<td>${(m.aiProb*100).toFixed(1)}%</td>
<td>${(m.edge*100).toFixed(1)}%</td>
<td class="alpha">${m.rankScore.toFixed(2)}</td>
</tr>
`

table.innerHTML += row

})

}catch(err){

console.error("Market load failed:", err)

}

}

loadMarkets()
setInterval(loadMarkets,30000)
