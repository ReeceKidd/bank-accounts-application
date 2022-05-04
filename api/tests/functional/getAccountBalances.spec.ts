import request from 'supertest';
import app from '../../src/app';

jest.setTimeout(100000);

describe('getAccountBalances', () => {
  describe('success', () => {
    test('retrieves balances', async () => {
      expect.assertions(5);
      const accountsResponse = await request(app()).get('/accounts/balances');
      expect(accountsResponse.status).toBe(200);
      expect(accountsResponse.body.accountBalances).toEqual(expect.any(Array));
      expect(accountsResponse.body.accountBalances[0].id).toEqual(
        expect.any(Number)
      );
      expect(accountsResponse.body.accountBalances[0].name).toEqual(
        expect.any(String)
      );
      expect(accountsResponse.body.accountBalances[0].totalBalance).toEqual(
        expect.any(String)
      );
    });
  });
});
