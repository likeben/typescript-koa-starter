import { Context } from 'koa';
import { IMiddleware } from 'koa-router';
import { mixed, MixedSchema } from 'yup';
import logger from '../../helpers/logger';
import * as schemaMap from './schemas';

function createValidator(type: 'body' | 'query' | 'params' = 'body') {
  return (schemaName: string): IMiddleware => {
    const schema: MixedSchema = (schemaMap as any)[schemaName];
    if (schema instanceof mixed) {
      return async (ctx: Context, next: () => Promise<any>) => {
        const values =
          type === 'params'
            ? ctx.params
            : type === 'query'
              ? ctx.query
              : ctx.request.body;
        await schema.validate(values);
        await next();
      };
    } else {
      logger.warn(`Waring: validator schema ${schemaName} is not existed`);
      return async (_, next: () => Promise<any>) => {
        await next();
      };
    }
  };
}

export const validateBody = createValidator('body');

export const validateParams = createValidator('params');

export const validateQuery = createValidator('query');
