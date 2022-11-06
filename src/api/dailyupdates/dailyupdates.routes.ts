import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as DailyupdateHandlers from './dailyupdates.handlers';
import { Dailyupdate } from './dailyupdates.model';

const router = Router();

router.get('/', DailyupdateHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  DailyupdateHandlers.findOne,
);
router.post(
  '/',
  validateRequest({
    body: Dailyupdate,
  }),
  DailyupdateHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Dailyupdate,
  }),
  DailyupdateHandlers.updateOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  DailyupdateHandlers.deleteOne,
);

export default router;
