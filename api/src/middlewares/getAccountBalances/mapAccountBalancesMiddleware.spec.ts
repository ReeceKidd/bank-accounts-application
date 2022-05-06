import axios from 'axios';
import { getServiceConfig } from '../../getServiceConfig';
import { mapAccountBalancesMiddleware } from './mapAccountBalancesMiddleware';
const { NUMBER_OF_TRANSACTION_CALL_REATTEMPTS } = getServiceConfig();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('mapAccountBalancesMiddleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('should fail after NUMBER_OF_TRANSACTION_CALL_REATTEMPTS', async () => {
    expect.assertions(1);
    const request: any = {};
    const response: any = { locals: {} };
    const next = jest.fn();

    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 0,
          name: 'Kristina Koch MD Checking'
        },
        {
          id: 1,
          name: 'Nils Frami I Checking'
        },
        {
          id: 2,
          name: 'Ms. Kelsi Fahey Checking'
        }
      ]
    });
    mockedAxios.get.mockResolvedValue({});

    await mapAccountBalancesMiddleware(request, response, next);
    expect(next).toHaveBeenCalledWith(
      Error(`Failed after ${NUMBER_OF_TRANSACTION_CALL_REATTEMPTS} attempts`)
    );
  });

  test('call populate response.locals.amountBalances and call next when successful', async () => {
    expect.assertions(2);
    const request: any = {};
    const response: any = { locals: {} };
    const next = jest.fn();

    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 0,
          name: 'Kristina Koch MD Checking'
        },
        {
          id: 1,
          name: 'Nils Frami I Checking'
        },
        {
          id: 2,
          name: 'Ms. Kelsi Fahey Checking'
        }
      ]
    });
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 3,
          accountId: 4,
          amount: 1600
        }
      ]
    });
    await mapAccountBalancesMiddleware(request, response, next);

    expect(response.locals.accountBalances).toEqual(expect.any(Array));
    expect(next).toBeCalledWith();
  });
});
