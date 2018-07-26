import Koa, { Context } from 'koa';
import Router from 'koa-router';
import { login, signUp } from '../controllers/userController';
import { validateBody } from '../middlewares/validator';

export default (app: Koa) => {
  const router = new Router({ prefix: '/api' });

  router.get('/', async (ctx: Context) => {
    ctx.body = 'OK!';
  });

  router.post('/signUp', validateBody('signUp'), signUp);

  router.post('/login', validateBody('login'), login);

  app.use(router.routes()).use(router.allowedMethods());
};
