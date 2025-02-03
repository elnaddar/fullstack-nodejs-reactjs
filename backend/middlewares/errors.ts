// @ts-types="npm:@types/express@5"
import { Errback, NextFunction, Request, Response } from 'express';

const errorsMiddleware = (
  err: Errback,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;

  res.status(status).json({
    message,
  });
};

export default errorsMiddleware;
