import Boom from 'boom';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Context, Middleware } from 'koa';
import { validate } from '../helpers/authenticator';
import logger from '../helpers/logger';

function authentication(): Middleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      const token: string = ctx.request.header['x-auth'];
      if (!token) {
        throw new JsonWebTokenError('no token');
      }
      const user = await validate(token);
      if (!user) {
        throw new JsonWebTokenError('invalid token');
      }
      ctx.state.user = user;
      await next();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        logger.error(e);
        ctx.status = 401;
        ctx.body = Boom.unauthorized('invalid token').output.payload;
        return;
      }
      throw e;
    }
  };
}

export default authentication;
