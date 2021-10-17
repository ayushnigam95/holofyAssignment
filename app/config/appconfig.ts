const dotenv = require('dotenv');
dotenv.config();
const logger = require("../utilities/logger");

const BACKEND_SERVER_ENV = verifyenv("BACKEND_SERVER_ENV") || "dev"
const BACKEND_SERVER_PORT = Number(verifyenv("BACKEND_SERVER_PORT")) || 9695
const BACKEND_SERVER_DB_HOST = verifyenv("BACKEND_SERVER_DB_HOST") || "localhost"
const BACKEND_SERVER_DB_NAME = verifyenv("BACKEND_SERVER_DB_NAME") || "facile"
const BACKEND_SERVER_DB_PORT = Number(verifyenv("BACKEND_SERVER_DB_PORT")) || 27017
const BACKEND_SERVER_DB_USERNAME = verifyenv("BACKEND_SERVER_DB_USERNAME") || "dev"
const BACKEND_SERVER_DB_PASSWORD = verifyenv("BACKEND_SERVER_DB_PASSWORD") || "root@123"

function verifyenv(env_key) {
    if (process.env[env_key] == undefined) {
        logger.info(`Enviornment Configuration not found, using default for ${env_key}`)
        return undefined
    }
    else {
        return process.env[env_key]
    }
}

export var appConfig = {
    "version": "1.0.0",
    "appName": "Holofy",
    "server_env": BACKEND_SERVER_ENV,
    "server_port": BACKEND_SERVER_PORT,
    "database": {
        host: BACKEND_SERVER_DB_HOST,
        name: BACKEND_SERVER_DB_NAME,
        port: BACKEND_SERVER_DB_PORT,
        username: BACKEND_SERVER_DB_USERNAME,
        password: BACKEND_SERVER_DB_PASSWORD
    }
};
