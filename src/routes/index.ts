import Koa, { Context } from 'koa';
import Router from 'koa-router';
import { getUsers, login, signUp } from '../controllers/userController';
import authentication from '../middlewares/authentication';
import { validateBody } from '../middlewares/validator';

export default (app: Koa) => {
  const router = new Router({ prefix: '/api' });

  router.get('/', async (ctx: Context) => {
    ctx.body = 'OK!';
  });

  router.post('/signUp', validateBody('signUp'), signUp);

  router.post('/login', validateBody('login'), login);

  router.get('/users', authentication(), getUsers);

  app.use(router.routes()).use(router.allowedMethods());
};
