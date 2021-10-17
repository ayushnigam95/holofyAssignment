import { appConfig } from "./appconfig";
import * as mongoose from 'mongoose';
const logger = require("../utilities/logger");
const mongo_uri = `mongodb+srv://${appConfig.database.username}:${appConfig.database.password}@${appConfig.database.host}/?retryWrites=true`

export const databaseSetup = async () => {
  await mongoose.connect(mongo_uri, {
    dbName: appConfig.database.name,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false,
    // autoCreate: true,
    // poolSize: 10, // Maintain up to 10 socket connections
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4, // Use IPv4, skip trying IPv6
    // w: "majority",
    // keepAlive: true,
    // reconnectTries: 30 // The option `reconnectTries` is incompatible with the unified topology
  }).then(() => 
    logger.info(`Successfully connected to mongo: ${JSON.stringify(appConfig.database.host)}`)
  ).catch(error =>
    logger.error(`Failed to connect to mongo: ${error}`)
  )
}
