import "reflect-metadata";
import { Application, ApplicationOptions } from "./config/application";
import { ENV, APP_NAME, APP_VERSION, HOST, PORT, DB_HOST, DB_PORT, LOG_LEVEL } from '@vars';

import { displayBanner } from './utils/banner'

// Application options
const options: ApplicationOptions = {
  connectionName: "default",
  // logLevel: argv["leg-level"] || "debug",
  logLevel: LOG_LEVEL,
};

// Boot Application
Application.bootApp(options).then(app => {
  app.listen(PORT, HOST, () => {
    displayBanner(APP_NAME, ENV, APP_VERSION, HOST, PORT, DB_HOST, DB_PORT);
  });
}).catch(e => Application.logger.error(e));
