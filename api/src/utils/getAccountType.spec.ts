import { AccountType } from '../../../types';
import { getAccountType } from './getAccountType';

describe('getAccountType', () => {
  it('should return name without checking and accountType of checking when a name containing checking is used', () => {
    const { name, accountType } = getAccountType('Ms. Kelsi Fahey Checking');
    expect(name).toEqual('Ms. Kelsi Fahey ');
    expect(accountType).toEqual(AccountType.Checking);
  });
  it('should return name without saving and accountType of savings when a name containing savings is used', () => {
    const { name, accountType } = getAccountType('Ms. Kelsi Fahey Savings');
    expect(name).toEqual('Ms. Kelsi Fahey ');
    expect(accountType).toEqual(AccountType.Savings);
  });
});
