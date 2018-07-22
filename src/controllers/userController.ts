import { Context } from 'koa';
import { IMiddleware } from 'koa-router';
import logger from '../helpers/logger';
import User from '../models/User';

export const signUp: IMiddleware = async (ctx: Context) => {
  try {
    const { body: values } = ctx.request;
    await User.create({
      ...values,
      deleted: false,
    });
    ctx.status = 204;
    ctx.body = null;
  } catch (e) {
    logger.error(e);
    ctx.status = 500;
  }
};
