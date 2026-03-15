
export function rankMarkets(markets){

return markets.map(m=>{

const edge = m.edge || 0
const volume = m.volume || 0
const liquidity = m.liquidity || 0

const score =
(edge * 0.5) +
(volume * 0.000001 * 0.3) +
(liquidity * 0.000001 * 0.2)

return {
...m,
rankScore:score
}

})
.sort((a,b)=>b.rankScore-a.rankScore)

}
