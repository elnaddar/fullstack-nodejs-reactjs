// @ts-types="npm:@types/express@5"
import { Router } from 'express';
// @ts-types="@types/express-validator"
import { body } from 'express-validator';
import validator from '../../utils/validator.ts';
import User from '../../models/user-model.ts';
import authController from '../../controllers/auth-controller.ts';

const auth = Router();

auth.put(
  '/register',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please Enter a valid email.')
      .custom(async (value: string) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject('Email address already exists!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    validator,
  ],
  authController.register
);

auth.post('/login', authController.login);

export default auth;
