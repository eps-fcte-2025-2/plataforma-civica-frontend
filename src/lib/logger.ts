import pino from "pino";

const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === "development" ? "debug" : "info");

const logger = pino({
  level,
  base: undefined,
});

export default logger;
