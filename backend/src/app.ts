import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './app/config';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: [config.client_url as string] }));

// application routes
app.use('/', router);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
