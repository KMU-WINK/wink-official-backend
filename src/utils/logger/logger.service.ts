import { utilities, WinstonModule } from 'nest-winston';

import * as winston from 'winston';

import 'winston-daily-rotate-file';

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: `./logs/${level}`,
    filename: `%DATE%.log`,
    maxFiles: 30,
    zippedArchive: true,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      utilities.format.nestLike('Wink', {
        colors: false,
      }),
    ),
  };
};

export const LoggerService = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'http',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        utilities.format.nestLike('Wink', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),

    new winston.transports.DailyRotateFile(dailyOptions('info')),
    new winston.transports.DailyRotateFile(dailyOptions('error')),
  ],
});
