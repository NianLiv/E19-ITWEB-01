import { NextFunction, Response } from 'express';
import passport = require('passport');
import { TypedRequest } from '../shared/models/custom.model';
import User, { UserModel, UserSignInDTO, UserSignUpDTO } from './models/user.model';

export default class UserController {
  public signIn(req: TypedRequest<UserSignInDTO>, res: Response, next: NextFunction) {
    passport.authenticate('local', (errors, user: UserModel) => {
      if (user) {
        const token = user.generateJwtToken();
        res.status(200).send({ token });
      } else {
        res.status(401).send();
      }
    })(req, res, next);
  }

  public signUp(req: TypedRequest<UserSignUpDTO>, res: Response, next: NextFunction) {
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (e, user: UserModel) => {
      if (user) {
        const token = user.generateJwtToken();
        res.status(200).send({ token });
      } else {
        res.send(500).send('Failed during user registration');
      }
    });
  }

  public logout(req: Request, res: Response, next: NextFunction) {
    // TODO
  }
}
