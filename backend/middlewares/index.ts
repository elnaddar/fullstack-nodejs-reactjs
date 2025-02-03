// @ts-types="npm:@types/express@5"
import { Router } from 'express';
import jsonParser from './src/body-parse-json.ts';
import apiHeaders from './src/api-headers-middleware.ts';
import staticMiddleware from './src/static-middleware.ts';
import mutlerMiddleware from './src/multer.ts';

const middlewares = Router();

middlewares.use(jsonParser);
middlewares.use(mutlerMiddleware);
middlewares.use(staticMiddleware);
middlewares.use(apiHeaders);

export default middlewares;
