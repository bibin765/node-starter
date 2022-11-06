import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Dailyupdate = z.object({
  content: z.string().min(1),
  done: z.boolean(),
});

export type Dailyupdate = z.infer<typeof Dailyupdate>;
export type DailyupdateWithId = WithId<Dailyupdate>;
export const Dailyupdates = db.collection<Dailyupdate>('dailyupdates');
