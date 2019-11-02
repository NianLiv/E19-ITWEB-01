import { NextFunction, Request, Response } from 'express';
import { TypedRequest } from '../shared/models/custom.model';
import userModel from '../user/models/user.model';
import activityModel, { CreateActivityDTO } from './activity.model';

export class ActivityController {
  public async getActivities(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      res.status(500).send({ message: 'No user set' });
      return;
    }

    const user = await userModel.findById(req.user.id).populate({
      path: 'activities',
      populate: {
        path: 'workout',
      },
    });
    if (!user) {
      res.status(500).send({ message: 'User not found' });
      return;
    }

    console.log(user.activities);
    res.status(200).send(user.activities);
  }

  public async getActivity(req: Request, res: Response, next: NextFunction) {
    const activityId = req.params.id;

    // validation
    if (!req.user) {
      res.status(500).send({ message: 'No user set' });
      return;
    }

    if (!activityId) {
      res.status(400).send({ message: 'No activity id received' });
      return;
    }

    // get user with activities
    const user = await userModel.findById(req.user.id).populate({
      path: 'activities',
      populate: {
        path: 'workout',
      },
    });
    if (!user) {
      res.status(500).send({ message: 'User not found' });
      return;
    }
    const activity = user.activities.find((ac) => ac.id === activityId);
    if (!activity) {
      res.status(404).send({ message: `No activity found with id: ${activityId} for user` });
      return;
    }

    res.status(200).send(activity);
  }

  public async createActivity(req: TypedRequest<CreateActivityDTO>, res: Response, next: NextFunction) {
    // validation
    if (!req.body.workoutId) {
      res.status(400).send({ message: 'missing property: workoutId' });
      return;
    }

    // get user
    if (!req.user) {
      res.status(500).send({ message: 'No user set' });
      return;
    }
    const user = userModel.findById(req.user.id);
    if (!user) {
      res.status(500).send({ message: 'User not found' });
      return;
    }

    // create activity
    try {
      const activity = new activityModel({ workout: req.body.workoutId, comment: req.body.comment });
      await activity.save();
      await activity.populate('workout').execPopulate();
      await user.update({
        $addToSet: { activities: activity },
      });
      res.status(200).send(activity);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
