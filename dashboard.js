
async function loadMarkets(){

const res = await fetch("/.netlify/functions/markets");
const markets = await res.json();

const table = document.querySelector("#markets tbody");
table.innerHTML="";

markets.slice(0,50).forEach(m=>{

let signal="Neutral";

if(m.volume>100000){
signal="Whale Activity";
}

const row=document.createElement("tr");

row.innerHTML=`
<td>${m.question}</td>
<td>${(m.lastTradePrice*100).toFixed(1)}%</td>
<td>$${Math.round(m.volume)}</td>
<td>${signal}</td>
`;

table.appendChild(row);

});

}

loadMarkets();
setInterval(loadMarkets,30000);
