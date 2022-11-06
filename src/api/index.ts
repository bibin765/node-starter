import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import { auth } from '../middlewares';
import todos from './todos/todos.routes';
import auths from './auth/auth.routes';
import teams from './teams/teams.routes';
import dailyupdates from './dailyupdates/dailyupdates.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/todos', auth, todos);
router.use('/auth', auths);
router.use('/teams', auth, teams);
router.use('/dailyupdates', auth, dailyupdates);

export default router;
