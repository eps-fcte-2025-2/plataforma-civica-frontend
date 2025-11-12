type LogFn = (obj: unknown, msg?: string) => void;

export interface AppLogger {
  info: LogFn;
  debug: LogFn;
  warn: LogFn;
  error: LogFn;
}

const mk =
  (c: (...args: unknown[]) => void): LogFn =>
  (obj, msg) => {
    if (msg !== undefined) c(msg, obj);
    else c(obj);
  };

const logger: AppLogger = {
  info: mk(console.info.bind(console)),
  debug: mk(console.debug.bind(console)),
  warn: mk(console.warn.bind(console)),
  error: mk(console.error.bind(console)),
};

export default logger;
