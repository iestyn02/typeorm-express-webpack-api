import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import * as bunyan from 'bunyan';
import * as morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import { HttpError, NotFound, InternalServerError } from 'http-errors';
import { Express, Request, Response, NextFunction } from 'express';
import * as API from '@api/index';

import { connectionOptions } from '../db';
import { ENV, APP_NAME, APP_VERSION, DB_HOST, DB_PORT } from '@vars';

const { combine, timestamp, label, printf } = format;
const log = console.info;

export interface ApplicationOptions {
  connectionName: string;
  logLevel: string | number;
}

export class Application {

  private static _app: Express;

  public static logger: any;

  /**
   * Returns an Express Application with an active database connection
   * @param options
   */
  public static bootApp(options: ApplicationOptions): Promise<any> {

    if (this._app) return Promise.resolve(this._app);

    const logFormat = printf(({ level, message, label, timestamp }) => {
      // if (level === 'silly') {
      //   return `[${label}]: ${message}`;
      // } else {
      //   return `${timestamp} [${label}]: ${message}`;
      // }
      return `[${label}]: ${message}`;
    });

    this.logger = createLogger({
      level: 'info',
      format: combine(
        label({ label: APP_NAME }),
        timestamp(),
        logFormat
      ),
      transports: [
        new transports.Console()
      ]
    });

    if (!connectionOptions) throw new Error(`No ORM configuration found for connection named '${options.connectionName}'`);

    return createConnection(connectionOptions).then(_ => {

      // Express Application
      this._app = express();
      this._app.use(bodyParser.urlencoded({
        extended: true
      }));
      this._app.use(bodyParser.json({
        limit: '300kb'
      }));

      this._app.use(helmet())
      this._app.use(helmet.noCache())

      this._app.set('json spaces', 0);

      this._app.use((_: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type,WWW-Authenticate')
        res.header('X-Frame-Options', 'SAMEORIGIN')
        res.header('X-Content-Type-Options', 'nosniff')
        res.header('X-XSS-Protection', '1; mode=block')
        res.header('Content-Security-Policy', 'default-src \'self\'')
        next()
      });

      this._app.use(cors());

      this._app.get('/', (_: Request, res: Response, next: NextFunction) => {
        res.jsonp({
          status: res.statusCode,
          data: `API v${APP_VERSION} Running! 🎉`
        });
        next();
      });

      // Apply routes from modules
      this._app.use('/v1', API, (data: any, _: Request, res: Response, next: NextFunction) => {
        if (!(data instanceof HttpError)) {
          res.jsonp({
            status: res.statusCode,
            data
          });
          next();
        } else {
          next(data);
        }
      });

      this._app.use((_: Request, res: Response, next: NextFunction) => {
        if (!res.headersSent) throw new NotFound();
        next();
      });

      // 404 Not Found
      this._app.use((_: Request, res: Response, next: NextFunction) => {
        if (!res.headersSent) throw new NotFound();
        next();
      });

      // 500 Server Error
      this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (!res.headersSent) {
          if (!(err instanceof HttpError)) {
            this.logger.error(err);
            err = new InternalServerError();
          }
          res.status(err.statusCode);
          res.jsonp({ error: err });
        }
        next();
      });

      // Logger Middleware
      this._app.use((req: Request, res: Response) => {
        // TODO: log level
        // TODO: check env, ignore logs if test environment
        this.logger.info(`${res.statusCode} ${req.method}     ${req.url}`);
      });

      return this._app;

    }).catch(err => {
      this.logger.error(err);
    });
  }
}
