async function loadMarkets(){

const res = await fetch("/.netlify/functions/markets")
const markets = await res.json()

const table = document.getElementById("markets")
table.innerHTML=""

markets.slice(0,80).forEach(m=>{

let signal="neutral"

if(m.volume > 300000){
signal="whale"
}

if(m.volume > 600000){
signal="alpha"
}

const row=`
<tr>
<td>${m.question}</td>
<td>${(m.probability*100).toFixed(1)}%</td>
<td>$${m.volume}</td>
<td class="${signal}">${signal}</td>
</tr>
`

table.innerHTML+=row

})

}

loadMarkets()
setInterval(loadMarkets,20000)
