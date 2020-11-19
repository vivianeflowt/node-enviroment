/* eslint-disable */
"use strict";
/* eslint-enable */

const winston = require("winston");

const { createLogger, format, transports } = winston;

// const fs = require('fs');
// const path = require('path');
const FileRotateTransport = require("fast-file-rotate");

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    app: 6,
    other: 7,
  },
  colors: {
    error: "red",
    debug: "blue",
    warn: "yellow",
    data: "grey",
    info: "blue",
    verbose: "cyan",
    app: "green",
    other: "magenta",
  },
};

winston.addColors(config.colors);

const logger = createLogger({
  levels: config.levels,
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.prettyPrint(),
        format.timestamp({ format: "HH:mm:ss" }),
        format.printf(
          (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
        )
      ),
      handleExceptions: true,
    }),
    new FileRotateTransport({
      format: format.combine(
        format.prettyPrint(),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
        format.printf(
          (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
        )
      ),
      fileName: `${__dirname}/data/console%DATE%.log`,
      dateFormat: "DDMMYYYY",
      bufferSize: 4096,
      handleExceptions: true,
    }),
  ],
  level: "other",
});

module.exports = logger;
