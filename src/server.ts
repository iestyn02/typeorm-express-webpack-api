import "reflect-metadata";
import { Application, ApplicationOptions } from "./config/application";
import { ENV, APP_NAME, APP_VERSION, HOST, PORT, DB_HOST, DB_PORT } from '@vars';

import { displayBanner } from './utils/banner'
import { logger } from './config/winston'

// Application options
const options: ApplicationOptions = {
  connectionName: 'default'
};

// Boot Application
Application.bootApp(options).then(app => {
  app.listen(PORT, HOST, () => {
    if (ENV === 'production' || ENV === 'development') {
      displayBanner(APP_NAME, ENV, APP_VERSION, HOST, PORT, DB_HOST, DB_PORT);
    }
  });
}).catch(e => logger.error(e));
