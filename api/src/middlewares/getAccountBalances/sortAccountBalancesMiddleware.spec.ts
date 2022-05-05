import { sendAccountBalancesMiddleware } from './sendAccountBalancesMiddleware';
import { sortAccountBalancesMiddleware } from './sortAccountBalancesMiddleware';

describe('sendAccountBalancesMiddleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('should sort account balances by totalBalance', async () => {
    expect.assertions(2);
    const request: any = {};
    const accountBalanceOne = {
      id: 1,
      name: 'Nils Frami I ',
      totalBalance: '0.00',
      accountType: 'Checking'
    };
    const accountBalanceTwo = {
      id: 2,
      name: 'Ms. Kelsi Fahey ',
      totalBalance: '2900.75',
      accountType: 'Checking'
    };
    const response: any = {
      locals: {
        accountBalances: [accountBalanceOne, accountBalanceTwo]
      }
    };
    const next = jest.fn();
    await sortAccountBalancesMiddleware(request, response, next);
    expect(response.locals.accountBalances[0]).toEqual(accountBalanceTwo);
    expect(response.locals.accountBalances[1]).toEqual(accountBalanceOne);
  });

  test('should call next with error on failure', async () => {
    expect.assertions(1);
    const request: any = {};
    const response: any = {};
    const next = jest.fn();
    await sortAccountBalancesMiddleware(request, response, next);

    expect(next).toBeCalledWith(expect.any(Error));
  });
});
