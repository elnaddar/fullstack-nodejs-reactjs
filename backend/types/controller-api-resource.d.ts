import { ExpressMiddleware } from './express-middleware.d.ts';

interface ApiResourse {
  index?: ExpressMiddleware;
  show?: ExpressMiddleware;
  store?: ExpressMiddleware;
  update?: ExpressMiddleware;
  destroy?: ExpressMiddleware;
}
