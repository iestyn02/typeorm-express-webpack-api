import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import { HttpError, NotFound, InternalServerError } from 'http-errors';
import { Express, Request, Response, NextFunction } from 'express';
import * as API from '@api/index';

import { connectionOptions } from '../db';
import { ENV, APP_VERSION } from '@vars';
import { logger } from '../winston'

export interface ApplicationOptions {
  connectionName: string;
}

export class Application {

  private static _app: Express;

  /**
   * Returns an Express Application with an active database connection
   * @param options
   */
  public static bootApp(options: ApplicationOptions): Promise<any> {

    if (this._app) return Promise.resolve(this._app);

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

      // 404 Not Found
      this._app.use((_: Request, res: Response, next: NextFunction) => {
        if (!res.headersSent) throw new NotFound();
        next();
      });

      // 500 Server Error
      this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (!res.headersSent) {
          if (!(err instanceof HttpError)) {
            logger.error(err);
            err = new InternalServerError();
          }
          res.status(err.statusCode);
          res.jsonp({ error: err });
        }
        next();
      });

      // Logger Middleware
      if (ENV === 'production') {
        this._app.use(morgan('dev'))
      } else if (ENV === 'development') {
        this._app.use((req: Request, res: Response) => {
          // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
          logger.info(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} "${req.method} ${req.url} HTTP/${req.httpVersion}" ${res.statusCode} ${req.method} ${res.getHeader('content-length')} "${req.headers.referrer || req.headers.referer || ''}" "${req.headers['user-agent']}"`);
        });
      }

      return this._app;

    }).catch(err => {
      logger.error(err);
    });
  }
}
