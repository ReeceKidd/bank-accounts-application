import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import Decimal from 'decimal.js';

import { Account, AccountBalance, Transaction } from '../../../types';
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

    const numberOfTransactionCallReattempts = 5;
    const accountBalances: AccountBalance[] = await Promise.all(
      accounts.map(async ({ id, name }) => {
        for (let i = 0; i < numberOfTransactionCallReattempts; i++) {
          try {
            const transactionsResponse = await axios.get(
              `${TRANSACTIONS_API_URL}/${id}`
            );
            const transactions = transactionsResponse.data;

            const totalBalance = transactions.reduce(
              (amount: number, transaction: Transaction) =>
                new Decimal(transaction.amount).plus(amount).toFixed(2),
              new Decimal(0).toFixed(2)
            );

            return {
              id,
              name,
              totalBalance
            };
          } catch (err) {
            console.log((err as Error).message, i + 1);
          }
        }
        throw new Error(
          `Failed after ${numberOfTransactionCallReattempts} attempts`
        );
      })
    );

    response.status(200).send({ accountBalances });
  } catch (err) {
    console.log('Err', (err as Error).message);
    next(err);
  }
};
