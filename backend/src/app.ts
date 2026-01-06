import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './app/config';
import router from './app/routes';
import { UrlControllers } from './app/modules/url/url.controller';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: [config.client_url as string] }));

// application routes
app.use('/api/v1', router);

// redirect routes
app.get('/', UrlControllers.redirectBaseUrlToClient);
app.get('/:id', UrlControllers.redirectToOriginalUrl);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
