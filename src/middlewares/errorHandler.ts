import { Context, Middleware } from 'koa';
import logger from '../helpers/logger';

function errorHandler(): Middleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (e) {
      if (e instanceof Error) {
        logger.error('\n', 'error: ', e.stack, '\n', 'ctx: ', ctx);
      } else {
        logger.error('\n', 'error: ', e, '\n', 'ctx: ', ctx);
      }
      ctx.status = 500;
      ctx.body = {
        error: '系统繁忙',
      };
    }
  };
}

export default errorHandler;
