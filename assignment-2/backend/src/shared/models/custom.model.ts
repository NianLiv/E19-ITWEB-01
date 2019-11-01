import { Request } from 'express';
import { LoggedInUser } from '../../user/models/user.model';

declare global {
  namespace Express {
    // tslint:disable-next-line: no-empty-interface
    interface User extends LoggedInUser {}
  }
}

export interface TypedRequest<B = any> extends Request {
  body: B;
}
