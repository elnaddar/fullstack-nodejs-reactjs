// @ts-types="npm:@types/express@5"
import { Router } from 'express';
import feedController from '../../controllers/feed-controller.ts';
// @ts-types="@types/express-validator"
import { body } from 'express-validator';
import validator from '../../utils/validator.ts';

const feeds = Router();

feeds.get('/posts', feedController.index!);
feeds.get('/posts/:postId', feedController.show!);
feeds.post(
  '/posts',
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
    validator,
  ],
  feedController.store!
);
feeds.put(
  '/posts/:postId',
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
    validator,
  ],
  feedController.update!
);

feeds.delete('/posts/:postId', feedController.destroy!);

export default feeds;
