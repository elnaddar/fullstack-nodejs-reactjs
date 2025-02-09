import User from '../models/user-model.ts';
import { ExpressMiddleware } from '../types/express-middleware.d.ts';
// @ts-types="@types/bcryptjs"
import bcrypt from 'bcryptjs';
// @ts-types="@types/jsonwebtoken"
import jwt from 'jsonwebtoken';

const authController: { [key: string]: ExpressMiddleware } = {};

authController.register = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then(async (hashedPassword) => {
      const user = new User({ name, email, password: hashedPassword });
      const createdUser = await user.save();
      res.status(201).json({
        message: 'User created successfully',
        userId: createdUser._id,
      });
    })
    .catch(next);
};

authController.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(async (user) => {
      const error = new Error('Invalid Credentials');
      error.statusCode = 401;

      if (!user) {
        throw error;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw error;
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
        },
        'some-secret-private-key',
        {
          expiresIn: '1h',
        }
      );

      return res.status(200).json({
        token,
        userId: user._id.toString(),
      });
    })
    .catch(next);
};

export default authController;
