import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Account, AccountBalance, Transaction } from '../../types';
import { getServiceConfig } from '../getServiceConfig';

const { ACCOUNTS_API_URL, TRANSACTIONS_API_URL } = getServiceConfig();

export const accountBalancesMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const accountsResponse = await axios.get(ACCOUNTS_API_URL);
    const accounts: Account[] = accountsResponse.data;

    const accountBalances: AccountBalance[] = await Promise.all(
      accounts.map(async ({ id, name }) => {
        for (let i = 0; i < 5; i++) {
          try {
            const transactionsResponse = await axios.get(
              `${TRANSACTIONS_API_URL}/${id}`
            );
            const transactions = transactionsResponse.data;

            const totalBalance = transactions.reduce(
              (amount: number, transaction: Transaction) =>
                amount + transaction.amount,
              0
            );

            return {
              id,
              name,
              totalBalance
            };
          } catch (err) {
            console.log((err as Error).message, i);
          }
        }
        throw new Error('Failed after five attempts');
      })
    );

    response.status(200).send({ success: true, accountBalances });
  } catch (err) {
    next(err);
  }
};
