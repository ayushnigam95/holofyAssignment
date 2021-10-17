import { v4 as uuid } from "uuid";
import { appConfig } from "../config/appconfig"
import { HTTPCode } from "../constants/enums/http-codes"
import { Response } from 'express';
const logger = require("../utilities/logger")
export class ResponseInterceptor {

    constructor() {
    }

    commonKeys() {
        return {
            ver: appConfig.version,
            timestamp: new Date().toISOString(),
            txnid: uuid()
        }
    }

    sendResponse(res: Response, message: string, data: any, httpCode: HTTPCode) {
        logger.info("Sending Response")
        let responsePayload = { ...this.commonKeys(), ...{ message: message, data: data } }
        return res.status(httpCode).send(responsePayload)
    }

}