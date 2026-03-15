
function detectCategory(text){

text = text.toLowerCase()

if(text.includes("bitcoin") || text.includes("crypto")) return "crypto"
if(text.includes("election") || text.includes("president")) return "politics"
if(text.includes("world cup") || text.includes("ufc")) return "sports"

return "general"
}
