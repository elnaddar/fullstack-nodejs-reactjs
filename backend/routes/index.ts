// @ts-types="npm:@types/express@5"
import { Router } from 'express';
import feeds from './src/feeds-routes.ts';
import auth from './src/auth-routes.ts';

const router = Router();

router.use('/feeds', feeds);
router.use('/auth', auth);

export default router;
