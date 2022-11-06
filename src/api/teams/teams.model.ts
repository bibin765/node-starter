import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';


export const Team = z.object({
  name: z.string(),
  admin: z.string(),
  members: z.array(z.string()).optional(),
  questions: z.array(z.string()).optional(),
});

export type Team = z.infer<typeof Team>;
export type TeamWithId = WithId<Team>;
export const Teams = db.collection<Team>('teams');
