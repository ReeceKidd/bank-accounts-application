import { Request, Response, NextFunction } from 'express';

import { AccountBalance } from '../../../../types';

export const sortAccountBalancesMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.locals.accountBalances = (
      response.locals.accountBalances as AccountBalance[]
    ).sort((a, b) => b.totalBalance - a.totalBalance);
    next();
  } catch (err) {
    next(err);
  }
};
