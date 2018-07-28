import Boom from 'boom';
import { Context } from 'koa';
import { IMiddleware } from 'koa-router';
import { MongoError } from 'mongodb';
import { authenticate } from '../helpers/authenticator';
import logger from '../helpers/logger';
import User from '../models/User';

export const signUp: IMiddleware = async (ctx: Context) => {
  try {
    const { body: values } = ctx.request;
    const user = await User.create({
      ...values,
      deleted: false,
    });
    const token = authenticate(user);
    const userObject = user.toJSON();
    Reflect.deleteProperty(userObject, 'password');
    ctx.status = 200;
    ctx.body = {
      user: userObject,
      token,
    };
  } catch (e) {
    if (e instanceof MongoError && e.code === 11000) {
      logger.error(e);
      ctx.status = 400;
      ctx.body = Boom.badRequest('username is already signUp').output.payload;
      return;
    }
    throw e;
  }
};

interface LoginPayload {
  username: string;
  password: string;
}

export const login: IMiddleware = async (ctx: Context) => {
  try {
    const { username, password } = ctx.request.body as LoginPayload;
    const user = await User.findOne({ username, deleted: false });
    if (user) {
      const isValid = user.comparePassword(password);
      if (isValid) {
        const token = authenticate(user);
        const userObject = user.toJSON();
        Reflect.deleteProperty(userObject, 'password');
        ctx.status = 200;
        ctx.body = {
          user: userObject,
          token,
        };
      } else {
        ctx.status = 401;
        ctx.body = Boom.unauthorized('invalid password').output.payload;
      }
    } else {
      ctx.status = 401;
      ctx.body = Boom.unauthorized('invalid username').output.payload;
    }
  } catch (e) {
    throw e;
  }
};

interface QueryParams {
  username?: string;
}

export const getUsers: IMiddleware = async (ctx: Context) => {
  const { username } = ctx.query;
  const params: QueryParams = {};
  if (username) {
    params.username = username;
  }
  const users = await User.find({ ...params, deleted: false }).select(
    '-password'
  );
  ctx.status = 200;
  ctx.body = users;
};
