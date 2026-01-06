import express from 'express';
import { UrlControllers } from './url.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UrlValidations } from './url.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), UrlControllers.getMyAllUrls);

router.post(
    '/',
    auth(),
    validateRequest(UrlValidations.createShortUrl),
    UrlControllers.createShortUrl,
);

export const UrlRoutes = router;
