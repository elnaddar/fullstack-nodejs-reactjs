// @ts-types="npm:@types/express@5"
import { Router, static as static_ } from 'express';
import path from 'node:path';

import rootDir from '../../utils/path.ts';

const staticMiddleware = Router();

staticMiddleware.use('/images', static_(path.join(rootDir, '/images')));

export default staticMiddleware;
