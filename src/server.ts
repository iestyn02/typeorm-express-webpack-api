import "reflect-metadata";
import { argv } from "yargs";
import { Application, ApplicationOptions } from "./config/application";
import { HOST, PORT } from '@vars';

// Application options
const options: ApplicationOptions = {
  connectionName: "default",
  logLevel: argv["leg-level"] || "debug",
};

// Boot Application
Application.getApp(options).then(app => {
  app.listen(PORT, HOST, () => {
    Application.logger.info(`Serving on http://${HOST}:${PORT}`);
  });
}).catch(e => Application.logger.error(e));
