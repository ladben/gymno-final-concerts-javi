import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http-exception';
// import { db } from '../data/connection';

export const getSystemStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
