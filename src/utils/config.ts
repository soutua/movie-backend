require('dotenv').config()

const { PORT, MOVIEDB_API_KEY, TOKEN_SECRET } = process.env

export default {
  PORT,
  MOVIEDB_API_KEY,
  TOKEN_SECRET
}
