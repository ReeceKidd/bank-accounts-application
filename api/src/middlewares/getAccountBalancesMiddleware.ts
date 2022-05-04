import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import Decimal from 'decimal.js';

import {
  Account,
  AccountBalance,
  AccountType,
  Transaction
} from '../../../types';
import { getServiceConfig } from '../getServiceConfig';

const { ACCOUNTS_API_URL, TRANSACTIONS_API_URL } = getServiceConfig();

export const getAccountType = (
  name: string
): { name: string; accountType: AccountType } => {
  if (name.includes(AccountType.Checking)) {
    return {
      name: name.replace(AccountType.Checking, ''),
      accountType: AccountType.Checking
    };
  }
  if (name.includes(AccountType.Saving)) {
    return {
      name: name.replace(AccountType.Saving, ''),
      accountType: AccountType.Saving
    };
  }
  return { name, accountType: AccountType.Unknown };
};

export const removeSFromName = (name: string) => {
  if (name.includes(' s')) {
    return name.slice(0, name.length - 1);
  }
  return name;
};

export const getAccountBalancesMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const accountsResponse = await axios.get(ACCOUNTS_API_URL);
    const accounts: Account[] = accountsResponse.data;

    const numberOfTransactionCallReattempts = 5;
    const accountBalances: AccountBalance[] = await Promise.all(
      accounts.map(async (account) => {
        for (let i = 0; i < numberOfTransactionCallReattempts; i++) {
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
              name: removeSFromName(name),
              totalBalance,
              accountType
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

    const sortedAccountBalances = accountBalances.sort(
      (a, b) => b.totalBalance - a.totalBalance
    );

    response.status(200).send({
      accountBalances: sortedAccountBalances
    });
  } catch (err) {
    next(err);
  }
};
