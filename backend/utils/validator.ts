// @ts-types="npm:@types/express@5"
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default function validator(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Faild');
    error.statusCode = 422;
    error.body = errors.array();
    next(error);
  }
  next();
}
