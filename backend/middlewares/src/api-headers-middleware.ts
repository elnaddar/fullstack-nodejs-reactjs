// @ts-types="npm:@types/express@5"
import { Router } from 'express';
// @ts-types="@types/cors"
import cors from 'cors';

const apiHeaders = Router();

apiHeaders.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

export default apiHeaders;
