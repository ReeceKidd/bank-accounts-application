import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import Decimal from 'decimal.js';

import { Account, Transaction } from '../../../../types';
import { getServiceConfig } from '../../getServiceConfig';
import { getAccountType } from '../../utils/getAccountType';
const {
  ACCOUNTS_API_URL,
  TRANSACTIONS_API_URL,
  NUMBER_OF_TRANSACTION_CALL_REATTEMPTS
} = getServiceConfig();

export const mapAccountBalancesMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const accountsResponse = await axios.get(ACCOUNTS_API_URL);
    const accounts: Account[] = accountsResponse.data;
    response.locals.accountBalances = await Promise.all(
      accounts.map(async (account) => {
        for (let i = 0; i < NUMBER_OF_TRANSACTION_CALL_REATTEMPTS; i++) {
          try {
            const transactionsResponse = await axios.get(
              `${TRANSACTIONS_API_URL}/${account.id}`
            );
            const transactions = transactionsResponse.data;

            const totalBalance = transactions.reduce(
              (amount: number, transaction: Transaction) =>
                new Decimal(transaction.amount).plus(amount).toFixed(2),
              new Decimal(0).toFixed(2)
            );
            const { name, accountType } = getAccountType(account.name);

            return {
              id: account.id,
              name: name,
              totalBalance,
              accountType,
              transactions: transactions.map((transaction: Transaction) => ({
                ...transaction,
                amount: new Decimal(transaction.amount).toFixed(2)
              }))
            };
          } catch (err) {
            console.log((err as Error).message, i + 1);
          }
        }
        throw new Error(
          `Failed after ${NUMBER_OF_TRANSACTION_CALL_REATTEMPTS} attempts`
        );
      })
    );
    next();
  } catch (err) {
    next(err);
  }
};
