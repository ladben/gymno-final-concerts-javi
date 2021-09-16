import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/http-exception';
import { userService } from '../services';
import { LoginRequest } from '../models';

export const loginController = {
  async post(
    req: Request<unknown, unknown, LoginRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    const data = await userService
      .login({ username, password })
      .catch(error => {
        next(new HttpException(500, error));
      });
    if (data) {
      let code: number;
      if (
        data.status === 'error' &&
        data.message === 'Username or password is incorrect.'
      ) {
        code = 401;
      } else if (data.status === 'error') {
        code = 400;
      } else {
        code = 200;
      }

      res.status(code).json(data);
    }
  },
};
