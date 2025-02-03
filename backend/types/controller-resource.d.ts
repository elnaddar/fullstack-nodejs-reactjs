import { ExpressMiddleware } from './express-middleware.d.ts';

interface Resourse {
  index?: ExpressMiddleware;
  show?: ExpressMiddleware;
  store?: ExpressMiddleware;
  create?: ExpressMiddleware;
  edit?: ExpressMiddleware;
  update?: ExpressMiddleware;
  destroy?: ExpressMiddleware;
}
