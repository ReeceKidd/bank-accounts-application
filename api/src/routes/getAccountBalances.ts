import { mapAccountBalancesMiddleware } from '../middlewares/getAccountBalances/mapAccountBalancesMiddleware';
import { sendAccountBalancesMiddleware } from '../middlewares/getAccountBalances/sendAccountBalancesMiddleware';
import { sortAccountBalancesMiddleware } from '../middlewares/getAccountBalances/sortAccountBalancesMiddleware';

export const getAccountBalancesMiddlewares = [
  mapAccountBalancesMiddleware,
  sortAccountBalancesMiddleware,
  sendAccountBalancesMiddleware
];
