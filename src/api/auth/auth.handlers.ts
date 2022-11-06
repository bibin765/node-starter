import { NextFunction, Request, Response } from 'express';
import { Users } from './users.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'bbnKey';

export const loginOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await Users.findOne({ email: req.body.email });
    if (!foundUser) {
      throw new Error('Name of user is not correct');
    }
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (isMatch) {
      const token = jwt.sign({ _id: foundUser._id?.toString(), email: foundUser.email }, SECRET_KEY, {
        expiresIn: '2 days',
      });
      res.status(200).send({ user: { _id : foundUser._id, email: foundUser.email, name: foundUser.name }, token: token });
    } else {
      throw new Error('Password is not correct');
    }    
  } catch (error) {
    next(error);   
  }
};

export const registerOne = async (req: Request, res: Response) => {
  try {
    await Users.insertOne(req.body);
    res.status(200).send('Inserted successfully');
  } catch (error) {
    throw new Error('User with email already present');
  }
};