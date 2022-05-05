import { sendAccountBalancesMiddleware } from './sendAccountBalancesMiddleware';

describe('sendAccountBalancesMiddleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('should send the account balances', async () => {
    expect.assertions(2);
    const request: any = {};
    const send = jest.fn();
    const response: any = {
      status: jest.fn(() => ({ send })),
      locals: {
        accountBalances: [
          {
            id: 0,
            name: 'Kristina Koch MD ',
            totalBalance: '2900.75',
            accountType: 'Checking'
          },
          {
            id: 1,
            name: 'Nils Frami I ',
            totalBalance: '0.00',
            accountType: 'Checking'
          },
          {
            id: 2,
            name: 'Ms. Kelsi Fahey ',
            totalBalance: '0.00',
            accountType: 'Checking'
          }
        ]
      }
    };
    const next = jest.fn();
    await sendAccountBalancesMiddleware(request, response, next);

    expect(response.status).toBeCalledWith(200);
    expect(send).toBeCalledWith({
      accountBalances: response.locals.accountBalances
    });
  });

  test('should call next with error on failure', async () => {
    expect.assertions(1);
    const request: any = {};
    const response: any = {};
    const next = jest.fn();
    await sendAccountBalancesMiddleware(request, response, next);

    expect(next).toBeCalledWith(expect.any(Error));
  });
});
