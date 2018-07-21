import { Context } from 'koa';
import User from '../models/User';

export const login = async (ctx: Context) => {
  const { username, password } = ctx.body;
  return User.create({
    username,
    password,
  });
};
