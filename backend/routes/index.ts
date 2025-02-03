// @ts-types="npm:@types/express@5"
import { Router } from 'express';
import feeds from './src/feeds-routes.ts';

const router = Router();

router.use('/feeds', feeds);

export default router;
