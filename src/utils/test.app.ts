import "reflect-metadata";
import * as supertest from "supertest";
import { Application, ApplicationOptions } from "../config/application";

const options: ApplicationOptions = {
  connectionName: "default",
  logLevel: 99,
};

export function getTestApp(): Promise<any> {
  return Application.getApp(options)
    .then(app => supertest(app))
    .catch(e => Application.logger.error(e));
}
