const { transports, createLogger, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: "makeistan service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/combined.log" }),
  ],
});

module.exports = logger;
