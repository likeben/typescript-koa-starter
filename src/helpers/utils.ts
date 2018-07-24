import bcrypt from 'bcryptjs';
import logger from './logger';

export const getEnvItem = (key: string) => {
  const value = process.env[key];
  if (!value) {
    logger.error(`Environment variable ${key} is not defined`);
    return process.exit(1);
  }
  return value;
};

export const hashPwd = (value: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
};

export const comparePwd = bcrypt.compareSync;
