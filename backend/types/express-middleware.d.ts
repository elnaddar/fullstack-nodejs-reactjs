// @ts-types="npm:@types/express@5"
import { Request, Response, NextFunction } from 'express';

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void> | any;
