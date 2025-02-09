import User from '../models/user-model.ts';
import { ExpressMiddleware } from '../types/express-middleware.d.ts';
// @ts-types="@types/bcryptjs"
import bcrypt from 'bcryptjs';

const authController: { [key: string]: ExpressMiddleware } = {};

authController.register = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then(async (hashedPassword) => {
      const user = new User({ name, email, password: hashedPassword });
      const createdUser = await user.save();
      res
        .status(201)
        .json({
          message: 'User created successfully',
          userId: createdUser._id,
        });
    })
    .catch(next);
};

export default authController;
