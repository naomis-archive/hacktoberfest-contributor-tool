import { createLogger, format, transports, config } from "winston";

const { combine, timestamp, colorize, printf } = format;

/**
 * Standard log handler, using winston to wrap and format
 * messages. Call with `logHandler.log(level, message)`.
 *
 * @param {string} level - The log level to use.
 * @param {string} message - The message to log.
 */
export const logHandler = createLogger({
  levels: config.npm.levels,
  level: "silly",
  transports: [
    new transports.Console(),
    new transports.File({ filename: "results/_runLog.log" }),
  ],
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
  ),
  exitOnError: false,
});

/**
 * Special log handler to pass strings specifically to the log file.
 */
export const runBreaks = createLogger({
  transports: [new transports.File({ filename: "results/_runLog.log" })],
  format: printf((info) => `${info.message}`),
});
