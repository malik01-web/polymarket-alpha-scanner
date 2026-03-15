
let previousMarkets={};

async function checkAlerts(){

const res=await fetch("/.netlify/functions/markets");
const markets=await res.json();

const alertBox=document.getElementById("alerts");

markets.forEach(m=>{

const prev=previousMarkets[m.id];

if(prev){

const change=Math.abs(m.lastTradePrice-prev);

if(change>0.05){

const div=document.createElement("div");
div.className="alert";

div.innerHTML=`🚨 ${m.question} moved ${(change*100).toFixed(1)}%`;

alertBox.prepend(div);

}

}

previousMarkets[m.id]=m.lastTradePrice;

});

}

setInterval(checkAlerts,20000);
