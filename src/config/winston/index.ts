import { createLogger, transports, format } from 'winston';
import { LOG_DIR } from '@vars';

const { splat, combine, timestamp, printf, colorize } = format;

const formatCombined = printf(({ timestamp, level, message, meta }) => {
  return `${level} ${timestamp} ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
  transports: [
    new transports.File({
      filename: `./${LOG_DIR || 'logs'}/combined.log`,
      level: 'info'
    }),
    new transports.File({
      filename: `./${LOG_DIR || 'logs'}/errors.log`,
      level: 'error'
    }),
    new transports.Console({
      level: 'info',
      silent: false,
      format: combine(
        timestamp(),
        splat(),
        colorize(),
        formatCombined,
      )
    })
  ],
  exitOnError: false
});

export { logger };
