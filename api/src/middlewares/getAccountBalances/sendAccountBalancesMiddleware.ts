import { Request, Response, NextFunction } from 'express';

export const sendAccountBalancesMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.status(200).send({
      accountBalances: response.locals.accountBalances
    });
  } catch (err) {
    next(err);
  }
};
