import Boom from 'boom';
import { Context, Middleware } from 'koa';
import { ValidationError } from 'yup';
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
      if (e instanceof ValidationError) {
        ctx.status = 400;
        ctx.body = Boom.badRequest(e.message).output.payload;
        return;
      }
      ctx.status = 500;
      ctx.body = {
        error: '系统繁忙',
      };
    }
  };
}

export default errorHandler;
