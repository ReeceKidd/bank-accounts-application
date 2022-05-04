import dotenv from 'dotenv';
dotenv.config();

export interface AppConfigHttp {
  NODE_ENV: string;
  PORT: string;
  ACCOUNTS_API_URL: string;
  TRANSACTIONS_API_URL: string;
}

export type AppConfig = AppConfigHttp;

export const getServiceConfig = (
  environment: NodeJS.ProcessEnv = process.env
): AppConfig => {
  const { NODE_ENV, PORT, ACCOUNTS_API_URL, TRANSACTIONS_API_URL } =
    environment;

  if (!NODE_ENV) throw new Error('NODE_ENV is not provided.');

  if (!PORT) throw new Error('PORT is not provided.');

  if (!ACCOUNTS_API_URL) throw new Error('ACCOUNTS_API_URL is not provided.');

  if (!TRANSACTIONS_API_URL)
    throw new Error('TRANSACTIONS_API_URL is not provided.');

  return {
    NODE_ENV,
    PORT,
    ACCOUNTS_API_URL,
    TRANSACTIONS_API_URL
  } as AppConfigHttp;
};
