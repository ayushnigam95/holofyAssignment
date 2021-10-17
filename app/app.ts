import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { AppRoutes } from './routes/app.routes';
import { appConfig } from "./config/appconfig";
import { databaseSetup } from './config/db-connection';
const logger = require("./utilities/logger");
class App {
    public app: express.Application;
    private PORT: number = appConfig.server_port;

    constructor() {
        this.app = express();
        this.config();
        databaseSetup()
        this.app.listen(this.PORT, function () {
            logger.info(`Server listening on port: ${appConfig.server_port}`)
        });

        const appRoutes = new AppRoutes();
        for (let i = 0; i < appRoutes.AppGetRoutes.length; i++) {
            this.app.get(appRoutes.AppGetRoutes[i].path, [appRoutes.AppGetRoutes[i].component]);
        }
        for (let j = 0; j < appRoutes.AppPostRoutes.length; j++) {
            this.app.post(appRoutes.AppPostRoutes[j].path, [appRoutes.AppPostRoutes[j].component]);
        }
        for (let k = 0; k < appRoutes.AppUpdateRoutes.length; k++) {
            this.app.put(appRoutes.AppUpdateRoutes[k].path, [appRoutes.AppUpdateRoutes[k].component]);
        }
        for (let l = 0; l < appRoutes.AppDeleteRoutes.length; l++) {
            this.app.delete(appRoutes.AppDeleteRoutes[l].path, [appRoutes.AppDeleteRoutes[l].component]);
        }
    }

    private config(): void {
        this.app.use('/uploads', express.static('uploads'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }
}

export default new App().app;
