import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import logger from './logger';

let dotenvFilePath = '.env.example';
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  const isDotenvFileExisted = fs.existsSync(path.resolve(__dirname, '../.env'));
  if (isDotenvFileExisted) {
    dotenvFilePath = '.env';
  } else {
    logger.error('.env file is not existed');
    process.exit(1);
  }
}
dotenv.config({ path: dotenvFilePath });

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
