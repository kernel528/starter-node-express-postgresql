const { PORT = 5002 } = process.env;

const app = require("./app");
const listener = () => console.log(`Express server running at http://localhost:${PORT}!`);
app.listen(PORT, listener);
