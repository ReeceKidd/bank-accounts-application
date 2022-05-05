import { getServiceConfig } from './getServiceConfig';

describe('getServiceConfig', () => {
  const environmentMock = {
    NODE_ENV: 'NODE_ENV',
    PORT: 'PORT',
    ACCOUNTS_API_URL: 'ACCOUNTS_API_URL',
    TRANSACTIONS_API_URL: 'TRANSACTIONS_API_URL'
  };

  test('that correct error is thrown when NODE_ENV is not provided', () => {
    expect.assertions(1);
    const environment = {
      ...environmentMock,
      NODE_ENV: undefined
    };

    try {
      getServiceConfig(environment);
    } catch (err) {
      expect((err as Error).message).toEqual('NODE_ENV is not provided.');
    }
  });

  test('that correct error is thrown when PORT is not provided', () => {
    expect.assertions(1);
    const environment = {
      ...environmentMock,
      PORT: undefined
    };

    try {
      getServiceConfig(environment);
    } catch (err) {
      expect((err as Error).message).toEqual('PORT is not provided.');
    }
  });

  test('that correct error is thrown when ACCOUNTS_API_URL is not provided', () => {
    expect.assertions(1);
    const environment = {
      ...environmentMock,
      ACCOUNTS_API_URL: undefined
    };

    try {
      getServiceConfig(environment);
    } catch (err) {
      expect((err as Error).message).toEqual(
        'ACCOUNTS_API_URL is not provided.'
      );
    }
  });

  test('that correct error is thrown when TRANSACTIONS_API_URL is not provided', () => {
    expect.assertions(1);
    const environment = {
      ...environmentMock,
      TRANSACTIONS_API_URL: undefined
    };

    try {
      getServiceConfig(environment);
    } catch (err) {
      expect((err as Error).message).toEqual(
        'TRANSACTIONS_API_URL is not provided.'
      );
    }
  });

  test('that correct error is thrown when NUMBER_OF_TRANSACTION_CALL_REATTEMPTS is not provided', () => {
    expect.assertions(1);
    const environment = {
      ...environmentMock,
      NUMBER_OF_TRANSACTION_CALL_REATTEMPTS: undefined
    };

    try {
      getServiceConfig(environment);
    } catch (err) {
      expect((err as Error).message).toEqual(
        'NUMBER_OF_TRANSACTION_CALL_REATTEMPTS is not provided.'
      );
    }
  });
  test('that correct error is thrown when NUMBER_OF_TRANSACTION_CALL_REATTEMPTS is not a number', () => {
    expect.assertions(1);
    const environment = {
      ...environmentMock,
      NUMBER_OF_TRANSACTION_CALL_REATTEMPTS: 'five'
    };

    try {
      getServiceConfig(environment);
    } catch (err) {
      expect((err as Error).message).toEqual(
        'NUMBER_OF_TRANSACTION_CALL_REATTEMPTS must be a number.'
      );
    }
  });
});
