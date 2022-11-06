import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { DailyupdateWithId, Dailyupdates, Dailyupdate } from './dailyupdates.model';

export async function findAll(req: Request, res: Response<DailyupdateWithId[]>, next: NextFunction) {
  try {
    const dailyupdates = await Dailyupdates.find().toArray();
    res.json(dailyupdates);
  } catch (error) {
    next(error);
  }
}

export async function createOne(req: Request<{}, DailyupdateWithId, Dailyupdate>, res: Response<DailyupdateWithId>, next: NextFunction) {
  try {
    const insertResult = await Dailyupdates.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting dailyupdate.');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);    
  }
}

export async function findOne(req: Request<ParamsWithId, DailyupdateWithId, {}>, res: Response<DailyupdateWithId>, next: NextFunction) {
  try {
    const result = await Dailyupdates.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Dailyupdate with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, DailyupdateWithId, Dailyupdate>, res: Response<DailyupdateWithId>, next: NextFunction) {
  try {
    const result = await Dailyupdates.findOneAndUpdate({
      _id: new ObjectId(req.params.id),
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Dailyupdate with id "${req.params.id}" not found.`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
  try {
    const result = await Dailyupdates.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Dailyupdate with id "${req.params.id}" not found.`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  } 
}