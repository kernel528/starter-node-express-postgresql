const { PORT = 5010 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Express server running at http://localhost:${PORT}!`);
app.listen(PORT, listener);