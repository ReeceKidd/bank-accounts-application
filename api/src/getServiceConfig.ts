import dotenv from 'dotenv';
dotenv.config();

export interface AppConfigHttp {
  NODE_ENV: string;
  PORT: string;
  ACCOUNTS_API_URL: string;
  TRANSACTIONS_API_URL: string;
  NUMBER_OF_TRANSACTION_CALL_REATTEMPTS: number;
}

export type AppConfig = AppConfigHttp;

export const getServiceConfig = (
  environment: NodeJS.ProcessEnv = process.env
): AppConfig => {
  const {
    NODE_ENV,
    PORT,
    ACCOUNTS_API_URL,
    TRANSACTIONS_API_URL,
    NUMBER_OF_TRANSACTION_CALL_REATTEMPTS
  } = environment;

  if (!NODE_ENV) throw new Error('NODE_ENV is not provided.');

  if (!PORT) throw new Error('PORT is not provided.');

  if (!ACCOUNTS_API_URL) throw new Error('ACCOUNTS_API_URL is not provided.');

  if (!TRANSACTIONS_API_URL)
    throw new Error('TRANSACTIONS_API_URL is not provided.');

  if (!NUMBER_OF_TRANSACTION_CALL_REATTEMPTS)
    throw new Error('NUMBER_OF_TRANSACTION_CALL_REATTEMPTS is not provided.');

  if (!Number(NUMBER_OF_TRANSACTION_CALL_REATTEMPTS))
    throw new Error('NUMBER_OF_TRANSACTION_CALL_REATTEMPTS must be a number.');

  return {
    NODE_ENV,
    PORT,
    ACCOUNTS_API_URL,
    TRANSACTIONS_API_URL,
    NUMBER_OF_TRANSACTION_CALL_REATTEMPTS: Number(
      NUMBER_OF_TRANSACTION_CALL_REATTEMPTS
    )
  } as AppConfigHttp;
};
