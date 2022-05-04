/* eslint-disable no-useless-escape */
import request from 'supertest';
import app from '../../src/app';

jest.setTimeout(100000);

describe('getAccountBalances', () => {
  describe('success', () => {
    test('retrieves balances', async () => {
      expect.assertions(1);
      const accountsResponse = await request(app()).get('/accounts/balances');
      expect(accountsResponse.status).toBe(200);
    });
  });
});
