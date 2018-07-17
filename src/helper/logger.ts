import pino from 'pino';

export const createLogger = (name?: string) => {
  return pino({
    name,
    prettyPrint: true,
    level: 'debug'
  });
};

export default createLogger();
