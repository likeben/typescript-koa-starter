import { Context, Middleware } from 'koa';
import logger from '../helpers/logger';

function errorHandler(): Middleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (e) {
      logger.error('server error', e, ctx);
    }
  };
}

export default errorHandler;
