import { WithId } from 'mongodb';
import * as z from 'zod';
import bcrypt from 'bcrypt';

const saltRounds = 8;

import { db } from '../../db';

export const User = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  password: z.preprocess((val: any) => bcrypt.hash(val, saltRounds), z.string()),
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');