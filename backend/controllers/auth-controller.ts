import User from '../models/user-model.ts';
import { ExpressMiddleware } from '../types/express-middleware.d.ts';

const authController: { [key: string]: ExpressMiddleware } = {};

authController.register = (req, res, next) => {
  const { email, name, password } = req.body;
  
};

export default authController;
