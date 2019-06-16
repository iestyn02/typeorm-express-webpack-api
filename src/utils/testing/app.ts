import "reflect-metadata";
import * as supertest from "supertest";
import { Application, ApplicationOptions } from "../../config/application";
import { logger } from '../../config/winston';

const options: ApplicationOptions = {
  connectionName: "default"
};

export function getTestApp(): Promise<any> {
  return Application.bootApp(options).then(app => {
    return supertest(app)
  }).catch(e => logger.error(e));
};
