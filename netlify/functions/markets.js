exports.handler = async () => {

const res = await fetch("https://gamma-api.polymarket.com/markets");
const data = await res.json();

return {
statusCode: 200,
body: JSON.stringify(data)
};

};
