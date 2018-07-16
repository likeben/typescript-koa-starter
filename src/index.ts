import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'OK!!!';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(6666);
console.log('server is running on port 6666');