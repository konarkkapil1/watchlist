import express from 'express';
import { NotFoundError, errorHandler } from '@konark/common';
import { router } from './route/index';
import { authenticateToken } from './middleware/authentication';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(authenticateToken);

app.use(router);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
