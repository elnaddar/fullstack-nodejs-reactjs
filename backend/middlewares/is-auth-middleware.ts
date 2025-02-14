// @ts-types="@types/jsonwebtoken"
import jwt from 'jsonwebtoken';
import { ExpressMiddleware } from '../types/express-middleware.d.ts';

const isAuth: ExpressMiddleware = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader!.split(' ')[1];

    const decodedToken = jwt.verify(token, 'some-secret-private-key');
    const userId = decodedToken.userId;
    if (!userId) {
      throw new Error();
    }

    req.userId = userId;

    next();
  } catch (_error) {
    const err = new Error('Unauthorized');
    err.statusCode = 401;

    throw err;
  }
};

export default isAuth;
