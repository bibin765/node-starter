import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import * as AuthHandlers from './auth.handlers';
import { User } from './users.model';

const router = Router();

router.post(
  '/login',
  AuthHandlers.loginOne,
);

router.post(
  '/register',
  validateRequest({
    body: User,
  }),
  AuthHandlers.registerOne,
);


export default router;
