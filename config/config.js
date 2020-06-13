require('dotenv').config()

module.exports = {
    development: {
        url: process.env.MAIN_DATABASE,
        dialect: 'postgres'
    },
    test: {
        url: process.env.TEST_DATABASE,
        dialect: 'postgres'
    },
    production: {
        url: process.env.PRODUCTION_DATABASE,
        dialect: 'postgres'
    }
};
