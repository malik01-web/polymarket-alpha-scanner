
exports.handler = async () => {

const token = "YOUR_TELEGRAM_BOT_TOKEN"
const chat = "YOUR_CHAT_ID"

const message = "🚨 Alpha signal detected"

await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chat,
text:message
})
})

return {
statusCode:200,
body:"sent"
}

}
