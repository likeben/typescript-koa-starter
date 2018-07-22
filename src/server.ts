import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
// import requestLogger from 'koa-logger';
import { connectMongo } from './helpers/db';
import logger from './helpers/logger';
import { getEnvItem } from './helpers/utils';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
// import multer from 'koa-multer';
// import static from 'koa-static';
// import session from 'koa-session';
// import conditional from 'koa-conditional-get';
// import etag from 'koa-etag';
// import compress from 'koa-compress';
// import mount from 'koa-mount';
// import { Z_SYNC_FLUSH } from 'zlib';

export default async () => {
  await connectMongo();

  const app = new Koa();
  app
    .use(errorHandler())
    .use(helmet())
    .use(cors())
    .use(bodyParser());
  // .use(requestLogger())
  // app.use(compress({
  //   filter: function (content_type: string) {
  //   	return /text/i.test(content_type)
  //   },
  //   threshold: 2048,
  //   flush: Z_SYNC_FLUSH
  // }))
  // app.use(conditional());
  // app.use(etag());
  // const CONFIG = {
  //   key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  //   /** (number || 'session') maxAge in ms (default is 1 days) */
  //   /** 'session' will result in a cookie that expires when session/browser is closed */
  //   /** Warning: If a session cookie is stolen, this cookie will never expire */
  //   maxAge: 86400000,
  //   overwrite: true, /** (boolean) can overwrite or not (default true) */
  //   httpOnly: true, /** (boolean) httpOnly or not (default true) */
  //   signed: true, /** (boolean) signed or not (default true) */
  //   rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  //   renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  // };

  // app.use(session(CONFIG, app));

  routes(app);

  // app.on('error', (err, ctx) => {
  //   logger.error('server error', err, ctx);
  // });

  const port = getEnvItem('PORT');
  app.listen(port, () => {
    logger.info(`server is running on port ${port}`);
  });
};
