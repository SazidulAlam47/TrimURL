import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { UrlRoutes } from '../modules/url/url.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/url',
        route: UrlRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
