import dotenv from 'dotenv';

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

import fs from 'fs';
import path from 'path';
import logger from './helpers/logger';
import startServer from './server';

startServer();
