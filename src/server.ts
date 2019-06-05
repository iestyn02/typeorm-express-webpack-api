import "reflect-metadata";
// import { argv } from "yargs";
import { Application, ApplicationOptions } from "./config/application";
import { HOST, PORT, LOG_LEVEL } from '@vars';

// Application options
const options: ApplicationOptions = {
  connectionName: "default",
  // logLevel: argv["leg-level"] || "debug",
  logLevel: LOG_LEVEL,
};

// Boot Application
Application.bootApp(options).then(app => {
  app.listen(PORT, HOST, () => {
    Application.logger.info(`API          : http://${HOST}:${PORT}`);
    Application.logger.info('');
    Application.logger.info('----------------------------------------------------------------------------');
  });
}).catch(e => Application.logger.error(e));
