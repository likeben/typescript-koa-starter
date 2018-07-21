import logger from './logger';

export const getEnvItem = (key: string) => {
  const value = process.env[key];
  if (!value) {
    logger.error(`Environment variable ${key} is not defined`);
    return process.exit(1);
  }
  return value;
};
