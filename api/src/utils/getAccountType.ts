import { AccountType } from '../../../types';

export const getAccountType = (
  name: string
): { name: string; accountType: AccountType } => {
  if (name.includes(AccountType.Checking)) {
    return {
      name: name.replace(AccountType.Checking, ''),
      accountType: AccountType.Checking
    };
  }
  if (name.includes(AccountType.Savings)) {
    return {
      name: name.replace(AccountType.Savings, ''),
      accountType: AccountType.Savings
    };
  }
  return { name, accountType: AccountType.Unknown };
};
