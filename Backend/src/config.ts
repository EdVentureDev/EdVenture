const path = require("path")
const dotenv = require("dotenv");

dotenv.config({ path: path.join(process.cwd(), "..", ".env") })

const port = process.env.PORT;
const dbURL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { port, dbURL, JWT_SECRET };
