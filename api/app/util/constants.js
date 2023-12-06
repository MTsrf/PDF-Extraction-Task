const dotenv = require('dotenv')
dotenv.config()

const globalConfig = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

module.exports = globalConfig;

