/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import { getAccountBalancesMiddlewares } from './routes/getAccountBalances';

dotenv.config();

export default () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.get('/accounts/balances', ...getAccountBalancesMiddlewares);

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app;
};
